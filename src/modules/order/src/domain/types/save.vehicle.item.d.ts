import { SaveFile } from "src/modules/shared/src/domain/types/save.file";
import { VehicleItem } from "./vehicle.item";

export type SaveVehicleItem = Omit<VehicleItem, 'pictures'> & { pictures: SaveFile[] };