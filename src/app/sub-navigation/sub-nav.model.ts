import { CommandType } from "../shared/enums/command-type.enum";
import { Observable } from "angular-slickgrid";

export interface ISubNavigationOptions {
    commandType: CommandType,
    customLinkCssClasses?: string;
    attribute?: string;
    text?: string;
    url?: string;
    action?:() => void;
}
