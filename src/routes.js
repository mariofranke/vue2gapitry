import HomeComponent from "@/views/HomeComponent";
import DashboardComponent from "@/views/DashboardComponent";
import AdminComponent from "@/views/AdminComponent";

export default [
  {
    path: "/",
    component: HomeComponent,
    name: "Home",
    icon: "mdi-home",
  },
  {
    path: "/dashboard",
    component: DashboardComponent,
    name: "My Dashboard",
    meta: {
      requiresAuth: true,
    },
    icon: "mdi-account-circle",
  },
  {
    path: "/admin",
    component: AdminComponent,
    name: "Admin Dashboard",
    icon: "mdi-account-circle",
  },
];
// import HomeView from "@/components/HomeView";
