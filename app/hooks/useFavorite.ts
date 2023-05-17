import axios from "axios";
import useLoginModal from "./useLoginModal";
import { SafeUser } from "@/app/types";
import { toast } from "react-hot-toast";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  // Kiểm tra đối tượng đã được thích hay chưa
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    // Return true if list includes listingID and fale if list not includes listingID

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
