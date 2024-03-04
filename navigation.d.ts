import { RootStackParamList } from "@/routes/index.type";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}