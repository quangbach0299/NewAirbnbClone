import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  // Id hiễn tại của user đang login
  const currentUser = await getCurrentUser();

  // Trong này sẽ có id của tác giả
  const listingDetail = await getListingById(params);

  const reservations = await getReservations(params);

  if (!listingDetail) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        reservations={reservations}
        listing={listingDetail}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
