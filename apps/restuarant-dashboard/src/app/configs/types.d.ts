type SideBarItemsTypes = {
  title: string;
  url: string;
  icon: any;
};

type MUICircularColorType = {
  color:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit";
};

type DashboardCardType = {
  icon: any;
  title: string;
  percentenge: string;
  color: MUICircularColorType.color;
  amount: string;
};

type OrdersDataType = {
  id: string;
  name: string;
  email: string;
  title: string;
  price: number | string;
  createdAt: Date | string;
};

type FoodCategoryType = {
  title: string;
};

type FoodsDataType = {
  id: string;
  name: string;
  price: number | string;
  totalOrders: number;
  createdAt: Date | string;
};
