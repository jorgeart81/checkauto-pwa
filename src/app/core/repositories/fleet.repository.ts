import { Vehicle } from '@/models/vehicle.model';

export abstract class FleetRepository {
  /**
   * Retrieves the full list of vehicles in the fleet.
   */
  abstract getVehicles(): Promise<Vehicle[]>;

  /**
   * Retrieves the currently selected vehicle ID.
   */
  abstract getActiveVehicleId(): Promise<string>;

  /**
   * Persists a newly added vehicle.
   */
  abstract saveVehicle(vehicle: Vehicle): Promise<void>;

  /**
   * Updates the odometer reading of a specific vehicle.
   */
  abstract updateOdometer(vehicleId: string, newOdometer: number): Promise<void>;

  /**
   * Sets and persists the active vehicle ID.
   */
  abstract setActiveVehicleId(vehicleId: string): Promise<void>;

  /**
   * Clears all vehicles from persistent storage.
   */
  abstract clearFleet(): Promise<void>;

  /**
   * Restores initial demo fleet into persistent storage.
   */
  abstract restoreDemoFleet(): Promise<Vehicle[]>;
}
