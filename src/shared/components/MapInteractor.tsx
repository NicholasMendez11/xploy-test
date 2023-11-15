"use client";
import React from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { Button, Chip } from "@material-tailwind/react";
import DialogForm from "./DialogForm";
import { MapForm } from "@/types/types";
import useMap from "@/hooks/useMap";
import { Toaster } from "react-hot-toast";
import { ErrorMessage } from "@hookform/error-message";

const MapInteractor: React.FC = () => {
  const {
    directions,
    distance,
    time,
    open,
    errors,
    register,
    handleSubmit,
    onSubmit,
    toggleOpen,
  } = useMap();

  return (
    <div className="w-full md:h-[650px] h-screen rounded-xl p-2 overflow-hidden shadow-lg md:flex bg-white">
      <Toaster />
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      >
        <div className="w-full h-full rounded-l-xl overflow-hidden ">
          <div className="md:hidden w-full flex justify-end p-2">
            <Button
              className="hover:bg-[#3592BC] text-[#3592BC] font-semibold bg-opacity-40 transition-all duration-150 hover:shadow-none border-none hover:text-white focus:border-none focus:shadow-none"
              variant="outlined"
              onClick={toggleOpen}
            >
              Click here to find a Path
            </Button>
          </div>
          <GoogleMap
            id="direction-example"
            mapContainerStyle={{
              height: "100%",
              width: "100%",
            }}
            zoom={2}
            center={{
              lat: 0,
              lng: -180,
            }}
          >
            {directions && <DirectionsRenderer directions={directions} />}
            <div className="flex justify-center p-4 gap-4">
              {" "}
              {distance && (
                <Chip
                  value={`Distance: ${distance}`}
                  className="w-auto text-center bg-[#ff514489]"
                />
              )}
              {time && (
                <Chip
                  value={`Time: ${time}`}
                  className="w-auto text-center bg-[#4447ff89]"
                />
              )}
            </div>
          </GoogleMap>
        </div>
      </LoadScript>
      <div className="flex flex-col w-96 h-ful  p-4">
        <h1 className="text-lg font-semibold text-center text-[#3391C1]">
          Spot Meter
        </h1>
        {/* form container */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 h-full justify-center"
        >
          <input
            className="w-full p-2 border-b-2 text-sm focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="From"
            {...register("from", {
              required: { value: true, message: "Origin is required" },
            })}
          />
          <span className=" text-red-400 text-xs">
            <ErrorMessage errors={errors} name="from" />
          </span>
          <input
            className="w-full p-2 border-b-2 text-sm focus:outline-none focus:border-blue-500 "
            type="text"
            placeholder="To"
            {...register("to", {
              required: { value: true, message: "Destination is required" },
            })}
          />
          <span className=" text-red-400 text-xs">
            <ErrorMessage errors={errors} name="to" />
          </span>
          <div className="w-ful flex justify-center">
            <Button
              type="submit"
              variant="text"
              className="flex items-center gap-2 text-gray-700 hover:bg-transparent hover:text-blue-500"
            >
              Search{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </div>
        </form>
      </div>
      <DialogForm
        open={open}
        handler={toggleOpen}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
      />
    </div>
  );
};

export default MapInteractor;
