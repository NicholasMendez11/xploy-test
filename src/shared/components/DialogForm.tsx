import React from "react";
import { Button, Dialog, Card, CardBody } from "@material-tailwind/react";
import { UseFormRegister } from "react-hook-form";
import { MapForm } from "@/types/types";

type props = {
  open: boolean;
  handler: () => void;
  onSubmit: () => void;
  register: UseFormRegister<MapForm>;
};
export default function DialogForm({
  open,
  handler,
  onSubmit,
  register,
}: props) {
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handler();
    onSubmit();
  };
  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handler}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold text-center text-[#3391C1]">
              {" "}
              Spot Meter
            </h1>
            <p>
              Enter your origin and destination and we will find the best route
              for you!
            </p>
            <form
              onSubmit={(e) => handleSearch(e)}
              className="flex flex-col gap-4 h-full justify-center"
            >
              <input
                className="w-full p-2 border-b-2 text-sm focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="From"
                {...register("from", { required: true })}
              />
              <input
                className="w-full p-2 border-b-2 text-sm focus:outline-none focus:border-blue-500 "
                type="text"
                placeholder="To"
                {...register("to", { required: true })}
              />
              <div className="w-ful flex justify-center">
                <Button
                  type="submit"
                  variant="text"
                  className="flex items-center gap-2 hover:bg-transparent text-blue-500"
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
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
