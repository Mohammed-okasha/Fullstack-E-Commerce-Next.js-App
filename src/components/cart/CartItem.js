import { useState } from "react";
import { useHttp } from "@/hooks/use-http";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Typography from "@mui/material/Typography";
import Image from "next/legacy/image";
import ActionButtons from "./ActionButtons";
import ConfirmModal from "../modals/Confirm";
import { cartActions } from "@/store/slices/cart-slice";
import { selectAuthState } from "@/store/slices/auth-slice";
import { userNotification } from "@/utils/notifications";
//=============================================================
const CartItem = ({ item }) => {
  const { session } = useSelector(selectAuthState);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const { loading, sendRequest } = useHttp();
  const dispatch = useDispatch();

  const openConfirmModal = () => setConfirmModalOpen(true);
  const closeConfirmModal = () => setConfirmModalOpen(false);

  const deleteItemFromCart = async () => {
    if (session) {
      try {
        const result = await sendRequest({
          url: `/api/cart/${item.id}`,
          method: "DELETE",
        });

        dispatch(cartActions.REMOVE_FROM_CART(result.id));
        userNotification("success", result.message);
      } catch (error) {
        userNotification("error", error.message);
      }

      return;
    }

    dispatch(cartActions.REMOVE_FROM_CART(item.id));
    userNotification("success", "item deleted from cart");
  };

  return (
    <>
      {confirmModalOpen && (
        <ConfirmModal
          onDelete={deleteItemFromCart}
          onCloseConfirm={closeConfirmModal}
          loading={loading}
        />
      )}
      <Box
        sx={{
          p: "16px",
          "&:not(:last-child)": {
            borderBottom: "1px solid #ccc",
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          gap={2}
          flexWrap="wrap"
        >
          <Box>
            <Link href={`/shop/${item.id}`} style={{ display: "block" }}>
              <Stack direction="row" mb={2} alignItems="center">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={90}
                  height={80}
                  priority={true}
                  className="radius"
                />
                <Box pl={2}>
                  <Typography>{item.title}</Typography>
                </Box>
              </Stack>
            </Link>
            <Button startIcon={<DeleteIcon />} onClick={openConfirmModal}>
              delete
            </Button>
          </Box>

          <ActionButtons
            id={item.id}
            price={item.price}
            percentage={item.discountPercentage}
            newPrice={item.newPrice}
            quantity={item.quantity}
          />
        </Stack>
      </Box>
    </>
  );
};

export default CartItem;
