import React, { useState } from "react";
import { IEvent } from "@/lib/database/models/event.model";
import { useRouter } from "next/navigation";
import { useChargily } from "@/app/api/hooks/use-chargily";

interface CheckoutProps {
  event: IEvent;
  userId: string;
}

const ChargilyPaymentButton: React.FC<CheckoutProps> = ({ event, userId }) => {
  const { pay } = useChargily();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <button
      onClick={async () => {
        setIsLoading(true);
        const price = parseInt(event.price);
        await pay({
          product_name: `${event.title}`,
          product_price: price,
        });
        setIsLoading(false);
      }}
    >
      {" "}
      {isLoading ? "loading..." : "pay now"}
    </button>
  );
};

export default ChargilyPaymentButton;