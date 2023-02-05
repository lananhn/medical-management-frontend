import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/Login.vue";
// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const TypeOfService = () => import("./components/TypeOfService.vue")
const Service = () => import("./components/Service.vue")
const AddTypeOfService = () => import("./components/AddTypeOfService.vue")
const UpdateTypeOfService = () => import("./components/UpdateTypeOfService.vue")
const AddService = () => import("./components/AddService.vue")
const UpdateService = () => import("./components/UpdateService.vue")
const Patient = () => import("./components/Patient.vue")
const ListTypeForNurse = () => import("./components/ListTypeForNurse.vue")
const ListServiceForNurse = () => import("./components/ListServiceForNurse.vue")
const ServiceReg = () => import("./components/ServiceReg.vue")
const Results = () => import("./components/Results.vue")
const User = () => import("./components/User.vue")
const UpdateUser = () => import("./components/UpdateUser.vue")
const UpdatePatient = () => import("./components/UpdatePatient.vue")
const AddUser = () => import("./components/AddUser.vue")
const AddPatient = () => import("./components/AddPatient.vue")
const AddRegistration = () => import("./components/AddRegistration.vue")
const UpdateReg = () => import("./components/UpdateReg.vue")
const AddResult = () => import("./components/AddResult.vue")
const UpdateResult = () => import("./components/UpdateResult.vue")
const Bill = () => import("./components/Bill.vue")
const Sum = () => import("./components/Sum.vue")
const AddBill = () => import("./components/AddBill.vue")
const UpdateBill = () => import("./components/UpdateBill.vue")
const AddSum = () => import("./components/AddSum.vue")
const ListSumByPatient = () => import("./components/ListSumByPatient.vue")
const UpdateSum = () => import("./components/UpdateSum.vue")

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/typeOfServices",
    name: "typeOfServiceView",
    component: TypeOfService,
  },
  {
    path: "/services",
    name: "serviceView",
    component: Service,
  },
  {
    path: "/services/add",
    name: "serviceAdd",
    component: AddService,
  },
  {
    path: "/services/:id",
    name: "serviceUpdate",
    component: UpdateService,
  },
  {
    path: "/type-of-services/add",
    name: "typeOfServiceAdd",
    component: AddTypeOfService,
  },
  {
    path: "/type-of-services/:id",
    name: "typeOfServiceById",
    component: UpdateTypeOfService,
  },
  {
    path: "/patients/add",
    name: "patientAdd",
    component: AddPatient,
  },
  {
    path: "/patients",
    name: "patientsView",
    component: Patient,
  },
  {
    path: "/patients/:id",
    name: "patientUpdate",
    component: UpdatePatient,
  },
  {
    path: "/listTypeOfServicesForNurse",
    name: "listTypeOfServicesForNurseView",
    component: ListTypeForNurse,
  },
  {
    path: "/listServicesForNurse",
    name: "listServicesForNurseView",
    component: ListServiceForNurse,
  },
  {
    path: "/user",
    name: "userView",
    component: User,
  },
  {
    path: "/user/add",
    name: "userAdd",
    component: AddUser,
  },
  {
    path: "/user/:id",
    name: "userById",
    component: UpdateUser,
  },
  {
    path: "/servicesReg",
    name: "servicesRegView",
    component: ServiceReg,
  },
  {
    path: "/serviceReg/add",
    name: "servicesRegAdd",
    component: AddRegistration,
  },
  {
    path: "/serviceReg/:id",
    name: "servicesRegUpdate",
    component: UpdateReg,
  },
  {
    path: "/results",
    name: "resultView",
    component: Results,
  },
  {
    path: "/results/add",
    name: "resultAdd",
    component: AddResult,
  },
  {
    path: "/results/:id",
    name: "resultUpdate",
    component: UpdateResult,
  },
  {
    path: "/bills",
    name: "billsView",
    component: Bill,
  },
  {
    path: "/bills/add",
    name: "billAdd",
    component: AddBill,
  },
  {
    path: "/bills/:id",
    name: "billUpdate",
    component: UpdateBill,
  },
  {
    path: "/sums",
    name: "sumsView",
    component: Sum,
  },
  {
    path: "/sums/add",
    name: "sumAdd",
    component: AddSum,
  },
  {
    path: "/sums/update/:id",
    name: "sumUpdate",
    component: UpdateSum,
  },
  {
    path: "/sums/:id",
    name: "listSumByPatient",
    component: ListSumByPatient,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
