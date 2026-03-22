import "styled-components";
import type { AppTheme } from "./app/theme";

declare module "styled-components" {
  export interface DefaultTheme extends AppTheme {}
}
