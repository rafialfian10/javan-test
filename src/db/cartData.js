import black from "../assets/img/black.jpg";
import navy from "../assets/img/navy.jpg";
import blue from "../assets/img/blue.jpg";

const cartsData = [
  {
    id: 1,
    image: black,
    title: "Black denim shirt",
    type: "Shirt - Black",
    note: "5",
    color: "Black",
    size: "M",
    price: "20.99",
    wishlist: false,
  },
  {
    id: 2,
    image: navy,
    title: "Navy denim shirt",
    type: "Shirt - Navy",
    note: "",
    color: "Navy",
    size: "L",
    price: "15.99",
    wishlist: false,
  },
  {
    id: 3,
    image: blue,
    title: "Blue denim shirt",
    type: "Shirt - Blue",
    note: "",
    color: "Blue",
    size: "S",
    price: "10.99",
    wishlist: false,
  },
];

export const FetchCartData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...cartsData]);
    }, 1000);
  });
};

export const UpdateCartData = (itemId) => {
  return new Promise((resolve, reject) => {
    try {
      const updatedData = cartsData?.map(item => {
        if (item?.id === itemId) {
          return { ...item, wishlist: !item?.wishlist };
        }
        return item;
      });
      resolve(updatedData);
    } catch (error) {
      reject(error);
    }
  });
};

export const DeleteCartData = (itemId) => {
  return new Promise((resolve, reject) => {
    try {
      const deletedData = cartsData?.filter(item => item?.id !== itemId);
      resolve(deletedData);
    } catch (error) {
      reject(error);
    }
  });
};
