type SibeBarItemsTypes = {
  title: string;
  url: string;
  icon: any;
};

type MUICircularColorType = {
  color:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'inherit';
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
  created_at: Date | string;
};


type FoodCategoryType = {
  title: string;
}