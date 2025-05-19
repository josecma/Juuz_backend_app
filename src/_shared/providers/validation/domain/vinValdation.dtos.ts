import { ApiProperty } from '@nestjs/swagger';

class VehicleInfoDTO {
  @ApiProperty({
    example: '',
    description: 'Antilock Braking System availability',
  })
  ABS: string;

  @ApiProperty({ example: '', description: 'Notes on active safety systems' })
  ActiveSafetySysNote: string;

  @ApiProperty({
    example: '',
    description: 'Availability of Adaptive Cruise Control',
  })
  AdaptiveCruiseControl: string;

  @ApiProperty({
    example: '',
    description: 'Availability of Adaptive Driving Beam',
  })
  AdaptiveDrivingBeam: string;

  @ApiProperty({
    example: '',
    description: 'Availability of Adaptive Headlights',
  })
  AdaptiveHeadlights: string;

  @ApiProperty({ example: '', description: 'Additional error text' })
  AdditionalErrorText: string;

  @ApiProperty({ example: '', description: 'Location of airbag curtains' })
  AirBagLocCurtain: string;

  @ApiProperty({ example: '', description: 'Location of front airbags' })
  AirBagLocFront: string;

  @ApiProperty({ example: '', description: 'Location of knee airbags' })
  AirBagLocKnee: string;

  @ApiProperty({ example: '', description: 'Location of seat cushion airbags' })
  AirBagLocSeatCushion: string;

  @ApiProperty({ example: '', description: 'Location of side airbags' })
  AirBagLocSide: string;

  @ApiProperty({ example: '', description: 'Auto Reverse System availability' })
  AutoReverseSystem: string;

  @ApiProperty({
    example: '',
    description: 'Automatic Pedestrian Alerting Sound availability',
  })
  AutomaticPedestrianAlertingSound: string;

  @ApiProperty({ example: '', description: 'Axle Configuration' })
  AxleConfiguration: string;

  @ApiProperty({ example: '', description: 'Number of Axles' })
  Axles: string;

  @ApiProperty({ example: '', description: 'Base Price of vehicle' })
  BasePrice: string;

  @ApiProperty({ example: '', description: 'Battery Ampere hours' })
  BatteryA: string;

  @ApiProperty({ example: '', description: 'Battery Ampere hours to' })
  BatteryA_to: string;

  @ApiProperty({ example: '', description: 'Number of battery cells' })
  BatteryCells: string;

  @ApiProperty({ example: '', description: 'Battery Information' })
  BatteryInfo: string;

  @ApiProperty({ example: '', description: 'Battery kilowatt hours' })
  BatteryKWh: string;

  @ApiProperty({ example: '', description: 'Battery kilowatt hours to' })
  BatteryKWh_to: string;

  @ApiProperty({ example: '', description: 'Number of battery modules' })
  BatteryModules: string;

  @ApiProperty({ example: '', description: 'Number of battery packs' })
  BatteryPacks: string;

  @ApiProperty({ example: '', description: 'Type of battery' })
  BatteryType: string;

  @ApiProperty({ example: '', description: 'Battery voltage' })
  BatteryV: string;

  @ApiProperty({ example: '', description: 'Battery voltage to' })
  BatteryV_to: string;

  @ApiProperty({ example: '', description: 'Bed length in inches' })
  BedLengthIN: string;

  @ApiProperty({ example: 'Not Applicable', description: 'Type of bed' })
  BedType: string;

  @ApiProperty({
    example: '',
    description: 'Blind Spot Intervention availability',
  })
  BlindSpotIntervention: string;

  @ApiProperty({ example: '', description: 'Blind Spot Monitor availability' })
  BlindSpotMon: string;

  @ApiProperty({ example: 'Not Applicable', description: 'Type of body cab' })
  BodyCabType: string;

  @ApiProperty({ example: '', description: 'Body class of the vehicle' })
  BodyClass: string;

  @ApiProperty({ example: '', description: 'Brake System Description' })
  BrakeSystemDesc: string;

  @ApiProperty({ example: '', description: 'Type of brake system' })
  BrakeSystemType: string;

  @ApiProperty({
    example: 'Not Applicable',
    description: 'Bus floor configuration type',
  })
  BusFloorConfigType: string;

  @ApiProperty({ example: '', description: 'Bus length' })
  BusLength: string;

  @ApiProperty({ example: 'Not Applicable', description: 'Type of bus' })
  BusType: string;

  @ApiProperty({ example: '', description: 'CAN AACN availability' })
  CAN_AACN: string;

  @ApiProperty({ example: '', description: 'CIB availability' })
  CIB: string;

  @ApiProperty({ example: '', description: 'Cash for clunkers eligibility' })
  CashForClunkers: string;

  @ApiProperty({ example: '', description: 'Charger level' })
  ChargerLevel: string;

  @ApiProperty({ example: '', description: 'Charger power in kilowatts' })
  ChargerPowerKW: string;

  @ApiProperty({ example: '', description: 'Cooling type of the vehicle' })
  CoolingType: string;

  @ApiProperty({ example: '', description: 'Curb weight in pounds' })
  CurbWeightLB: string;

  @ApiProperty({
    example: 'Not Applicable',
    description: 'Custom motorcycle type',
  })
  CustomMotorcycleType: string;

  @ApiProperty({
    example: '',
    description: 'Daytime running light availability',
  })
  DaytimeRunningLight: string;

  @ApiProperty({
    example: '',
    description: 'Destination market of the vehicle',
  })
  DestinationMarket: string;

  @ApiProperty({ example: '', description: 'Engine displacement in CC' })
  DisplacementCC: string;

  @ApiProperty({ example: '', description: 'Engine displacement in CI' })
  DisplacementCI: string;

  @ApiProperty({ example: '', description: 'Engine displacement in liters' })
  DisplacementL: string;

  @ApiProperty({ example: '', description: 'Number of doors' })
  Doors: string;

  @ApiProperty({
    example: '',
    description: 'Type of drive (e.g., FWD, RWD, AWD)',
  })
  DriveType: string;

  @ApiProperty({
    example: '',
    description: 'Driver assist technology availability',
  })
  DriverAssist: string;

  @ApiProperty({
    example: '',
    description: 'Dynamic brake support availability',
  })
  DynamicBrakeSupport: string;

  @ApiProperty({ example: '', description: 'EDR availability' })
  EDR: string;

  @ApiProperty({ example: '', description: 'ESC availability' })
  ESC: string;

  @ApiProperty({ example: '', description: 'EV drive unit description' })
  EVDriveUnit: string;

  @ApiProperty({
    example: '',
    description: 'Electrification level of the vehicle',
  })
  ElectrificationLevel: string;

  @ApiProperty({ example: '', description: 'Engine configuration' })
  EngineConfiguration: string;

  @ApiProperty({ example: '', description: 'Engine cycles' })
  EngineCycles: string;

  @ApiProperty({ example: '', description: 'Number of engine cylinders' })
  EngineCylinders: string;

  @ApiProperty({ example: '', description: 'Engine horsepower' })
  EngineHP: string;

  @ApiProperty({ example: '', description: 'Engine horsepower to' })
  EngineHP_to: string;

  @ApiProperty({ example: '', description: 'Engine kilowatts' })
  EngineKW: string;

  @ApiProperty({ example: '', description: 'Engine manufacturer' })
  EngineManufacturer: string;

  @ApiProperty({ example: '', description: 'Engine model' })
  EngineModel: string;

  @ApiProperty({ example: '', description: 'Entertainment system description' })
  EntertainmentSystem: string;

  @ApiProperty({
    example: '8',
    description: 'Error code related to vehicle data',
  })
  ErrorCode: string;

  @ApiProperty({
    example: '8 - No detailed data available currently',
    description: 'Error text providing details about the error code',
  })
  ErrorText: string;

  @ApiProperty({
    example: '',
    description: 'Forward collision warning availability',
  })
  ForwardCollisionWarning: string;

  @ApiProperty({ example: '', description: 'Type of fuel injection' })
  FuelInjectionType: string;

  @ApiProperty({ example: '', description: 'Primary fuel type' })
  FuelTypePrimary: string;

  @ApiProperty({ example: '', description: 'Secondary fuel type' })
  FuelTypeSecondary: string;

  @ApiProperty({ example: '', description: 'Gross combination weight rating' })
  GCWR: string;

  @ApiProperty({
    example: '',
    description: 'Gross combination weight rating to',
  })
  GCWR_to: string;

  @ApiProperty({ example: '', description: 'Gross vehicle weight rating' })
  GVWR: string;

  @ApiProperty({ example: '', description: 'Gross vehicle weight rating to' })
  GVWR_to: string;

  @ApiProperty({ example: '', description: 'Keyless ignition availability' })
  KeylessIgnition: string;

  @ApiProperty({
    example: '',
    description: 'Lane centering assistance availability',
  })
  LaneCenteringAssistance: string;

  @ApiProperty({
    example: '',
    description: 'Lane departure warning availability',
  })
  LaneDepartureWarning: string;

  @ApiProperty({ example: '', description: 'Lane keep system availability' })
  LaneKeepSystem: string;

  @ApiProperty({ example: '', description: 'Lower beam headlamp light source' })
  LowerBeamHeadlampLightSource: string;

  @ApiProperty({ example: 'HONDA', description: 'Make of the vehicle' })
  Make: string;

  @ApiProperty({ example: '474', description: 'Make ID' })
  MakeID: string;

  @ApiProperty({
    example: 'AMERICAN HONDA MOTOR CO., INC.',
    description: 'Manufacturer of the vehicle',
  })
  Manufacturer: string;

  @ApiProperty({ example: '988', description: 'Manufacturer ID' })
  ManufacturerId: string;

  @ApiProperty({ example: '', description: 'Model of the vehicle' })
  Model: string;

  @ApiProperty({ example: '', description: 'Model ID' })
  ModelID: string;

  @ApiProperty({ example: '1991', description: 'Model year of the vehicle' })
  ModelYear: string;

  @ApiProperty({
    example: 'Not Applicable',
    description: 'Motorcycle chassis type',
  })
  MotorcycleChassisType: string;

  @ApiProperty({
    example: 'Not Applicable',
    description: 'Motorcycle suspension type',
  })
  MotorcycleSuspensionType: string;

  @ApiProperty({ example: '', description: 'NCSA body type' })
  NCSABodyType: string;

  @ApiProperty({ example: '', description: 'NCSA make' })
  NCSAMake: string;

  @ApiProperty({
    example: '',
    description: 'NCSA mapping exception approval by',
  })
  NCSAMapExcApprovedBy: string;

  @ApiProperty({
    example: '',
    description: 'NCSA mapping exception approval on',
  })
  NCSAMapExcApprovedOn: string;

  @ApiProperty({ example: '', description: 'NCSA mapping exception' })
  NCSAMappingException: string;

  @ApiProperty({ example: '', description: 'NCSA model' })
  NCSAModel: string;

  @ApiProperty({ example: '', description: 'NCSA note' })
  NCSANote: string;

  @ApiProperty({ example: '', description: 'Non-land use description' })
  NonLandUse: string;

  @ApiProperty({ example: '', description: 'Notes about the vehicle' })
  Note: string;

  @ApiProperty({ example: '', description: 'Other bus information' })
  OtherBusInfo: string;

  @ApiProperty({ example: '', description: 'Other engine information' })
  OtherEngineInfo: string;

  @ApiProperty({ example: '', description: 'Other motorcycle information' })
  OtherMotorcycleInfo: string;

  @ApiProperty({
    example: '',
    description: 'Other restraint system information',
  })
  OtherRestraintSystemInfo: string;

  @ApiProperty({ example: '', description: 'Other trailer information' })
  OtherTrailerInfo: string;

  @ApiProperty({ example: '', description: 'Park assist availability' })
  ParkAssist: string;

  @ApiProperty({
    example: '',
    description: 'Pedestrian automatic emergency braking availability',
  })
  PedestrianAutomaticEmergencyBraking: string;

  @ApiProperty({ example: '', description: 'Plant city' })
  PlantCity: string;

  @ApiProperty({ example: '', description: 'Plant company name' })
  PlantCompanyName: string;

  @ApiProperty({ example: '', description: 'Plant country' })
  PlantCountry: string;

  @ApiProperty({ example: '', description: 'Plant state' })
  PlantState: string;

  @ApiProperty({
    example: '',
    description: 'Possible values for variable features',
  })
  PossibleValues: string;

  @ApiProperty({ example: '', description: 'Pretensioner system availability' })
  Pretensioner: string;

  @ApiProperty({
    example: '',
    description: 'Rear automatic emergency braking availability',
  })
  RearAutomaticEmergencyBraking: string;

  @ApiProperty({
    example: '',
    description: 'Rear cross traffic alert availability',
  })
  RearCrossTrafficAlert: string;

  @ApiProperty({
    example: '',
    description: 'Rear visibility system availability',
  })
  RearVisibilitySystem: string;

  @ApiProperty({ example: '', description: 'SAE automation level' })
  SAEAutomationLevel: string;

  @ApiProperty({ example: '', description: 'SAE automation level to' })
  SAEAutomationLevel_to: string;

  @ApiProperty({ example: '', description: 'All seat belts availability' })
  SeatBeltsAll: string;

  @ApiProperty({ example: '', description: 'Number of seat rows' })
  SeatRows: string;

  @ApiProperty({ example: '', description: 'Number of seats' })
  Seats: string;

  @ApiProperty({
    example: '',
    description: 'Semiautomatic headlamp beam switching availability',
  })
  SemiautomaticHeadlampBeamSwitching: string;

  @ApiProperty({ example: '', description: 'Series of the vehicle' })
  Series: string;

  @ApiProperty({ example: '', description: 'Secondary series of the vehicle' })
  Series2: string;

  @ApiProperty({ example: '', description: 'Steering location' })
  SteeringLocation: string;

  @ApiProperty({ example: '', description: 'Suggested VIN for the vehicle' })
  SuggestedVIN: string;

  @ApiProperty({ example: '', description: 'TPMS availability' })
  TPMS: string;

  @ApiProperty({ example: '', description: 'Top speed in MPH' })
  TopSpeedMPH: string;

  @ApiProperty({ example: '', description: 'Track width of the vehicle' })
  TrackWidth: string;

  @ApiProperty({ example: '', description: 'Traction control availability' })
  TractionControl: string;

  @ApiProperty({ example: 'Not Applicable', description: 'Trailer body type' })
  TrailerBodyType: string;

  @ApiProperty({ example: '', description: 'Trailer length' })
  TrailerLength: string;

  @ApiProperty({ example: 'Not Applicable', description: 'Type of trailer' })
  TrailerType: string;

  @ApiProperty({ example: '', description: 'Number of transmission speeds' })
  TransmissionSpeeds: string;

  @ApiProperty({ example: '', description: 'Style of transmission' })
  TransmissionStyle: string;

  @ApiProperty({ example: '', description: 'Trim of the vehicle' })
  Trim: string;

  @ApiProperty({ example: '', description: 'Secondary trim of the vehicle' })
  Trim2: string;

  @ApiProperty({ example: '', description: 'Turbocharger availability' })
  Turbo: string;

  @ApiProperty({
    example: '1HGBH41JXMN109186',
    description: 'Vehicle Identification Number',
  })
  VIN: string;

  @ApiProperty({ example: '', description: 'Valve train design' })
  ValveTrainDesign: string;

  @ApiProperty({ example: '1HGBH41J*MN', description: 'Vehicle descriptor' })
  VehicleDescriptor: string;

  @ApiProperty({ example: 'PASSENGER CAR', description: 'Type of vehicle' })
  VehicleType: string;

  @ApiProperty({ example: '', description: 'Long wheelbase' })
  WheelBaseLong: string;

  @ApiProperty({ example: '', description: 'Short wheelbase' })
  WheelBaseShort: string;

  @ApiProperty({ example: '', description: 'Type of wheelbase' })
  WheelBaseType: string;

  @ApiProperty({ example: '', description: 'Front wheel size' })
  WheelSizeFront: string;

  @ApiProperty({ example: '', description: 'Rear wheel size' })
  WheelSizeRear: string;

  @ApiProperty({ example: '', description: 'Number of wheels' })
  Wheels: string;

  @ApiProperty({ example: '', description: 'Type of windows' })
  Windows: string;
}

export class VehicleResponseDTO {
  @ApiProperty({ example: 1, description: 'Count of results returned' })
  Count: number;

  @ApiProperty({
    example: 'Informations',
    description: 'Response message',
  })
  Message: string;

  @ApiProperty({
    example: 'VIN(s): 1HGBH41JXMN109186',
    description: 'Search criteria used in the query',
  })
  SearchCriteria: string;

  @ApiProperty({
    type: [VehicleInfoDTO],
    description: 'List of vehicle information results',
  })
  Results: VehicleInfoDTO[];
}
