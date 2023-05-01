"use client";
import React, { useCallback, useState } from "react";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingReservationId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingReservationId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Delete successfully");
          router.refresh();
        })
        .catch((error) => {
          console.log(error);
          toast.error(error?.respone?.data?.error);
        })
        .finally(() => {
          setDeletingReservationId("");
        });
    },
    [deletingId]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you have been and where are you going ?"
      />
      <div className="mt-10 grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete Property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
