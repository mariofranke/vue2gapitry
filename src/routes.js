import HomeComponent from "@/components/HomeComponent";
import DashboardComponent from "@/components/DashboardComponent";
import AdminComponent from "@/components/AdminComponent";

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
