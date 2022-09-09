import HomeComponent from "@/components/HomeComponent";
/*import TestGraph from "@/components/TestGraph";
import testGraphs from "@/components/TestGraphs";
import LoginComponent from "@/components/LoginComponent";
import RegisterComponent from "@/components/RegisterComponent";
import DashboardComponent from "@/components/DashboardComponent";
import CalenderComponent from "@/components/CalenderComponent";*/

export default [
  {
    path: "/",
    component: HomeComponent,
    name: "Home",
    // meta: { requiresAuth: true },
    icon: "mdi-home",
  },
  /*	{
			path: "/testgraph",
			component: TestGraph,
			name: "TestGraph",
			icon: "mdi-chart-bar",
		},
		{
			path: "/testgraphs",
			component: testGraphs,
			name: "TestGraphs",
			icon: "mdi-chart-bar",
		},
		{
			path: "/login",
			component: LoginComponent,
			name: "Login",
			icon: "mdi-account",
		},
		{
			path: "/register",
			component: RegisterComponent,
			name: "Register",
			icon: "mdi-account-plus",
		},
		{
			path: "/dashboard",
			component: DashboardComponent,
			name: "Dashboard",
			icon: "mdi-account-circle",
		},
		{
			path: "/calender",
			component: CalenderComponent,
			name: "Calender",
			icon: "mdi-calendar",
		},*/
];
// import HomeView from "@/components/HomeView";
