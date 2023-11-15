import { MapForm } from "@/types/types";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

function useMap() {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MapForm>();

  const onSubmit: SubmitHandler<MapForm> = (data) => {
    toast.loading("Loading", { duration: 500 });
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: data.from,
        destination: data.to,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log("results", result);
          setDirections(result);
          const route = result!.routes[0].legs[0];
          setDistance(route.distance!.text);
          setTime(route.duration!.text);
          toast.success("Here is the best route", {
            icon: "🧭",
            duration: 4000,
          });
        }
        if (status === google.maps.DirectionsStatus.ZERO_RESULTS)
          return toast.error(`Upps, You will need a plane for that`, {
            icon: "⛔️ ✈️",
          });
        if (status === google.maps.DirectionsStatus.NOT_FOUND)
          return toast.error(
            `Upps, We coudln't find your location or destination, please check again `
          );
      }
    );
  };

  const toggleOpen = () => {
    setOpen(!open);
  };
  return {
    directions,
    distance,
    time,
    open,
    errors,
    register,
    handleSubmit,
    onSubmit,
    toggleOpen,
  };
}

export default useMap;
