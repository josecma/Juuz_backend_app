-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateEnum
CREATE TYPE "PaymentEnum" AS ENUM ('MASTERCARD', 'VISA', 'PAYPAL', 'DISCOVER', 'AMERICANEXPRESS');

-- CreateEnum
CREATE TYPE "ServiceEnum" AS ENUM ('TOWING', 'QUICK_ASSISTANCE', 'OTHERS');

-- CreateEnum
CREATE TYPE "SubServiceEnum" AS ENUM ('PICKUP', 'IRON', 'PULL', 'MULTIPLE_CARS', 'AIR', 'JUMP', 'PICKUP_DELIVERY', 'RUBBISH', 'MOVING');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('LOADING', 'LOADED', 'UPCOMING', 'DELIVERED', 'RETURNING', 'DOWNLOADING', 'BROKEN', 'CANCELLED');

-- CreateEnum
CREATE TYPE "VihecleOrderStatusEnum" AS ENUM ('RUNNING', 'NOT_RUNNING');

-- CreateEnum
CREATE TYPE "ComunicationEnum" AS ENUM ('OPEN', 'CLOSE');

-- CreateEnum
CREATE TYPE "TypePointEnum" AS ENUM ('COMPANY', 'DEPARTURE', 'VEHICLE', 'DESTANATION', 'DESTINATION');

-- CreateEnum
CREATE TYPE "DescriptionMessageEnum" AS ENUM ('CARRIER_OFERT', 'SHIPPER_OFERT', 'ACCEPT_ORDER', 'FINISH_ORDER', 'REFER_ORDER');

-- CreateEnum
CREATE TYPE "NegotiationStatus" AS ENUM ('OPEN', 'CLOSE');

-- CreateEnum
CREATE TYPE "LastNegotiatonEnums" AS ENUM ('CARRIER', 'SHIEPER');

-- CreateEnum
CREATE TYPE "PaymentMethodEnum" AS ENUM ('CASH', 'CREDIT_CARD', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "OrderStatusEnum" AS ENUM ('PENDING', 'ASSIGNED', 'IN_TRANSIT', 'HISTORY', 'COMPLETED', 'END');

-- CreateEnum
CREATE TYPE "OrderSubStatus" AS ENUM ('UPCOMING', 'ASSIGNED', 'OUT_OF_TIME', 'LATE_ORDER', 'CANCELLED', 'COMPLETE', 'STARTED', 'PICKUP', 'REPORT', 'DELIVERED');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('PASSENGER_CAR', 'MULTIPURPOSE_VEHICLE', 'TRUCK', 'BUS', 'MOTORCYCLE', 'TRAILER', 'LOW_SPEED_VEHICLE', 'VAN', 'MULTIPURPOSE_PASSENGER_VEHICLE');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('COMPLETED', 'PENDING');

-- CreateEnum
CREATE TYPE "PaymentMethodType" AS ENUM ('CASH', 'CARD', 'QUICK_DEPOSIT', 'WEEKLY_DEPOSIT');

-- CreateEnum
CREATE TYPE "CompanyStatus" AS ENUM ('NON_VERIFIED', 'VERIFIED', 'HOLD');

-- CreateTable
CREATE TABLE "requests" (
    "id" TEXT NOT NULL,
    "source" JSONB,
    "target" JSONB,
    "channel" JSONB,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "join_company_requests" (
    "id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "join_company_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_identities" (
    "user_id" TEXT NOT NULL,
    "identity_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "identities" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "metadata" JSONB,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "identities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_credentials" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3),

    CONSTRAINT "user_credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "identity_verifications" (
    "id" TEXT NOT NULL,
    "identity_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "identity_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_authentication_processes" (
    "id" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_authentication_processes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "secrets" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "secret" TEXT NOT NULL,

    CONSTRAINT "secrets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_hotp_counters" (
    "id" TEXT NOT NULL,
    "user_otp_secret_id" TEXT NOT NULL,
    "counter" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_hotp_counters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channels" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_channels" (
    "channel_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "permissions" TEXT[],
    "items" JSONB NOT NULL,

    CONSTRAINT "user_channels_pkey" PRIMARY KEY ("channel_id","user_id")
);

-- CreateTable
CREATE TABLE "tracking_channels" (
    "channel_id" TEXT NOT NULL,
    "stakeholder_id" TEXT NOT NULL,
    "permissions" TEXT[],

    CONSTRAINT "tracking_channels_pkey" PRIMARY KEY ("channel_id","stakeholder_id")
);

-- CreateTable
CREATE TABLE "businesses" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "businesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "item_id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("business_id","item_id")
);

-- CreateTable
CREATE TABLE "business_stakeholders" (
    "role" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "business_stakeholders_pkey" PRIMARY KEY ("business_id","user_id")
);

-- CreateTable
CREATE TABLE "bids" (
    "id" TEXT NOT NULL,
    "bidder_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "business_id" TEXT NOT NULL,
    "price" JSONB NOT NULL,

    CONSTRAINT "bids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "criteria" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "max" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "criteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "criterion_sets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "criterion_sets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "default_set_of_criteria_per_user_roles" (
    "criterionSetId" TEXT NOT NULL,
    "userRole" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "criterion_set_memberships" (
    "set_Id" TEXT NOT NULL,
    "criterion_Id" TEXT NOT NULL,
    "order" INTEGER,

    CONSTRAINT "criterion_set_memberships_pkey" PRIMARY KEY ("set_Id","criterion_Id")
);

-- CreateTable
CREATE TABLE "evaluations" (
    "id" TEXT NOT NULL,
    "evaluated_Id" TEXT NOT NULL,
    "criterionSet_Id" TEXT NOT NULL,
    "evaluator_Id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scores" (
    "id" TEXT NOT NULL,
    "evaluation_Id" TEXT NOT NULL,
    "criterion_Id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "comment" TEXT,

    CONSTRAINT "scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "key" VARCHAR NOT NULL,
    "size" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profile_pictures" (
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,

    CONSTRAINT "user_profile_pictures_pkey" PRIMARY KEY ("user_id","file_id")
);

-- CreateTable
CREATE TABLE "evidence_files" (
    "id" TEXT NOT NULL,
    "evidenceId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,

    CONSTRAINT "evidence_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evidences" (
    "id" TEXT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "coordinates" JSONB NOT NULL,
    "type" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "evidences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "category_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "vin" TEXT NOT NULL,
    "category_path" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "license_plate" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "carrierIdentifier" TEXT,
    "usdot" TEXT,
    "mc" TEXT,
    "primaryAdminEmail" TEXT,
    "countryCode" TEXT,
    "phoneNumber" TEXT,
    "extension" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "country" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "dotNumber" TEXT,
    "stripe_account_id" TEXT,
    "exp_month" TEXT,
    "exp_year" TEXT,
    "card_number" TEXT,
    "phone" TEXT,
    "infoUrl" TEXT,
    "hours" TEXT,
    "companyName" TEXT,
    "insuranceDetailsId" TEXT,
    "companyStatus" "CompanyStatus" DEFAULT 'NON_VERIFIED',
    "licenseType" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,
    "owner_id" TEXT,
    "score" JSONB,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "finalAmount" DOUBLE PRECISION,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "depositDate" TIMESTAMP(3) NOT NULL,
    "paymentMethodId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "orderId" TEXT,
    "userId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,
    "owner_id" TEXT,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transfer" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "description" TEXT,
    "paymentId" TEXT,
    "companyId" TEXT,
    "accountId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER DEFAULT 0,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PaymentMethodType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "discountPercentage" DOUBLE PRECISION NOT NULL,
    "companyId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "stripeId" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "bankCard" TEXT NOT NULL,
    "ytdGross" DOUBLE PRECISION NOT NULL,
    "netBalance" DOUBLE PRECISION NOT NULL,
    "paymentId" TEXT,
    "accountType" "TransactionType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "negotiationId" TEXT,
    "description" "DescriptionMessageEnum" NOT NULL,
    "userId" TEXT,
    "orderId" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,
    "owner_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "first_name" TEXT,
    "password" TEXT,
    "last_name" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_points" (
    "id" TEXT NOT NULL,
    "pointId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "share" BOOLEAN NOT NULL,

    CONSTRAINT "user_points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_members" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,

    CONSTRAINT "company_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_company_roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "user_company_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" TEXT NOT NULL,
    "vinNumber" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "insuranceDoc" TEXT,
    "faceId" TEXT,
    "vehicleType" TEXT,
    "service_id" TEXT,
    "capacity" INTEGER,
    "vehicleInfoId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,
    "owner_id" TEXT NOT NULL,
    "company_id" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleInfo" (
    "id" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,
    "owner_id" TEXT NOT NULL,
    "company_id" TEXT,

    CONSTRAINT "VehicleInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER,
    "brand_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleOrder" (
    "id" TEXT NOT NULL,
    "qty" INTEGER,
    "year" INTEGER DEFAULT 2000,
    "vehicle_type" "VehicleType" NOT NULL DEFAULT 'PASSENGER_CAR',
    "state" "VihecleOrderStatusEnum" NOT NULL DEFAULT 'RUNNING',
    "vehicle_color" TEXT,
    "license_plate" TEXT,
    "last_number" TEXT,
    "vehicle_Problem" TEXT,
    "additional_detail" TEXT,
    "is_the_keys_with_the_vehicle" BOOLEAN,
    "state_province" TEXT,
    "additional_vehicle_information" TEXT,
    "trailer_type" TEXT,
    "wide_load" BOOLEAN NOT NULL DEFAULT false,
    "order_id" TEXT,
    "model_id" TEXT,
    "driverId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,
    "owner_id" TEXT NOT NULL,
    "company_id" TEXT,

    CONSTRAINT "VehicleOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order_id" TEXT,
    "driverId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,
    "owner_id" TEXT NOT NULL,
    "company_id" TEXT,
    "user_id" TEXT,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FleetRecord" (
    "id" TEXT NOT NULL,
    "vinNumber" TEXT NOT NULL,
    "vehicleType" "VehicleType" NOT NULL DEFAULT 'TRUCK',
    "vehicleInfoId" TEXT,
    "order_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,
    "owner_id" TEXT NOT NULL,
    "company_id" TEXT,

    CONSTRAINT "FleetRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "driver_id" TEXT,
    "referred_id" TEXT,
    "is_assistance_request_for_now" BOOLEAN NOT NULL DEFAULT false,
    "expiration_time" TIMESTAMP(3) NOT NULL,
    "pick_up_date" TEXT,
    "price_per_mile" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "aditional_info" TEXT NOT NULL DEFAULT '',
    "delivery_date" TEXT,
    "payment_method" "PaymentMethodEnum" NOT NULL DEFAULT 'UNKNOWN',
    "price" INTEGER,
    "milles" INTEGER NOT NULL DEFAULT 0,
    "note" TEXT DEFAULT '',
    "email" TEXT,
    "reason" TEXT,
    "phone" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "email_second" TEXT,
    "phone_second" TEXT,
    "first_name_second" TEXT,
    "last_name_second" TEXT,
    "status" "OrderStatusEnum" NOT NULL,
    "sub_status" "OrderSubStatus" NOT NULL,
    "sub_service_id" TEXT,
    "departure_id" TEXT,
    "destination_id" TEXT,
    "car_count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,
    "owner_id" TEXT NOT NULL,
    "company_id" TEXT,
    "is_active" BOOLEAN DEFAULT true,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Negotiation" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "driver_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "offerCarrier" INTEGER NOT NULL,
    "lastNegotiaton" "LastNegotiatonEnums" NOT NULL DEFAULT 'SHIEPER',
    "status" "NegotiationStatus" NOT NULL DEFAULT 'OPEN',
    "counterOfferShipper" INTEGER DEFAULT 0,
    "company_id" TEXT,

    CONSTRAINT "Negotiation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Point" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "coords" geometry(Point, 4326) NOT NULL,
    "longitude" TEXT,
    "latitude" TEXT,
    "type" "TypePointEnum" DEFAULT 'COMPANY',
    "point_name" TEXT NOT NULL DEFAULT '',
    "address" TEXT DEFAULT '',
    "city" TEXT DEFAULT '',
    "state" TEXT DEFAULT '',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "order_id" TEXT,
    "driver_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,
    "owner_id" TEXT,
    "company_id" TEXT,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MiniPoint" (
    "id" TEXT NOT NULL,
    "coords" geometry(Point, 4326) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,

    CONSTRAINT "MiniPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Information" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "orderId" TEXT,
    "pointId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,
    "owner_id" TEXT NOT NULL,
    "company_id" TEXT,

    CONSTRAINT "Information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" "ServiceEnum" NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,
    "owner_id" TEXT NOT NULL,
    "company_id" TEXT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubService" (
    "id" TEXT NOT NULL,
    "name" "SubServiceEnum" NOT NULL,
    "description" TEXT,
    "service_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,
    "owner_id" TEXT NOT NULL,
    "company_id" TEXT,

    CONSTRAINT "SubService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AblyChannel" (
    "id" TEXT NOT NULL,
    "channelName" TEXT NOT NULL,
    "ablyUser" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,
    "owner_id" TEXT NOT NULL,
    "company_id" TEXT,

    CONSTRAINT "AblyChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comunication" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "driverChanelId" TEXT NOT NULL,
    "riderChanelId" TEXT NOT NULL,
    "numberOfComunications" INTEGER NOT NULL DEFAULT 0,
    "status" "ComunicationEnum" NOT NULL DEFAULT 'OPEN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,
    "owner_id" TEXT NOT NULL,
    "company_id" TEXT,

    CONSTRAINT "Comunication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "name" "OrderStatusEnum" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,
    "owner_id" TEXT,
    "company_id" TEXT,
    "userId" TEXT,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AblyChannelToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "join_company_requests_request_id_key" ON "join_company_requests"("request_id");

-- CreateIndex
CREATE UNIQUE INDEX "join_company_requests_request_id_company_id_key" ON "join_company_requests"("request_id", "company_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_identities_identity_id_key" ON "user_identities"("identity_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_identities_user_id_identity_id_key" ON "user_identities"("user_id", "identity_id");

-- CreateIndex
CREATE INDEX "identities_verified_type_value_idx" ON "identities"("verified", "type", "value");

-- CreateIndex
CREATE UNIQUE INDEX "identities_type_value_key" ON "identities"("type", "value");

-- CreateIndex
CREATE UNIQUE INDEX "user_credentials_user_id_key" ON "user_credentials"("user_id");

-- CreateIndex
CREATE INDEX "user_credentials_user_id_expires_at_idx" ON "user_credentials"("user_id", "expires_at");

-- CreateIndex
CREATE INDEX "identity_verifications_identity_id_status_idx" ON "identity_verifications"("identity_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "secrets_user_id_key" ON "secrets"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_hotp_counters_user_otp_secret_id_key" ON "user_hotp_counters"("user_otp_secret_id");

-- CreateIndex
CREATE INDEX "user_hotp_counters_user_otp_secret_id_idx" ON "user_hotp_counters"("user_otp_secret_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_hotp_counters_counter_user_otp_secret_id_key" ON "user_hotp_counters"("counter", "user_otp_secret_id");

-- CreateIndex
CREATE UNIQUE INDEX "channels_name_key" ON "channels"("name");

-- CreateIndex
CREATE INDEX "channels_name_idx" ON "channels"("name");

-- CreateIndex
CREATE INDEX "items_item_id_idx" ON "items"("item_id");

-- CreateIndex
CREATE INDEX "items_business_id_idx" ON "items"("business_id");

-- CreateIndex
CREATE INDEX "bids_item_id_business_id_idx" ON "bids"("item_id", "business_id");

-- CreateIndex
CREATE INDEX "bids_bidder_id_idx" ON "bids"("bidder_id");

-- CreateIndex
CREATE UNIQUE INDEX "criteria_name_key" ON "criteria"("name");

-- CreateIndex
CREATE INDEX "criteria_name_idx" ON "criteria"("name");

-- CreateIndex
CREATE UNIQUE INDEX "criterion_sets_name_version_key" ON "criterion_sets"("name", "version");

-- CreateIndex
CREATE UNIQUE INDEX "default_set_of_criteria_per_user_roles_criterionSetId_key" ON "default_set_of_criteria_per_user_roles"("criterionSetId");

-- CreateIndex
CREATE UNIQUE INDEX "default_set_of_criteria_per_user_roles_userRole_key" ON "default_set_of_criteria_per_user_roles"("userRole");

-- CreateIndex
CREATE UNIQUE INDEX "default_set_of_criteria_per_user_roles_criterionSetId_userR_key" ON "default_set_of_criteria_per_user_roles"("criterionSetId", "userRole");

-- CreateIndex
CREATE UNIQUE INDEX "files_key_key" ON "files"("key");

-- CreateIndex
CREATE INDEX "files_key_idx" ON "files"("key");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_pictures_user_id_key" ON "user_profile_pictures"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_pictures_file_id_key" ON "user_profile_pictures"("file_id");

-- CreateIndex
CREATE UNIQUE INDEX "evidence_files_fileId_key" ON "evidence_files"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_path_key" ON "categories"("path");

-- CreateIndex
CREATE INDEX "categories_path_idx" ON "categories"("path");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_vin_key" ON "vehicles"("vin");

-- CreateIndex
CREATE INDEX "vehicles_vin_license_plate_idx" ON "vehicles"("vin", "license_plate");

-- CreateIndex
CREATE UNIQUE INDEX "Company_dotNumber_key" ON "Company"("dotNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Company_card_number_key" ON "Company"("card_number");

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyName_key" ON "Company"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "Company_insuranceDetailsId_key" ON "Company"("insuranceDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_owner_id_key" ON "Company"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderId_key" ON "Payment"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Transfer_paymentId_key" ON "Transfer"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_name_companyId_key" ON "PaymentMethod"("name", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_points_pointId_key" ON "user_points"("pointId");

-- CreateIndex
CREATE UNIQUE INDEX "user_points_userId_key" ON "user_points"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_points_pointId_userId_key" ON "user_points"("pointId", "userId");

-- CreateIndex
CREATE INDEX "company_members_user_id_idx" ON "company_members"("user_id");

-- CreateIndex
CREATE INDEX "company_members_company_id_idx" ON "company_members"("company_id");

-- CreateIndex
CREATE INDEX "company_members_role_id_idx" ON "company_members"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "company_members_user_id_company_id_role_id_key" ON "company_members"("user_id", "company_id", "role_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_company_roles_name_key" ON "user_company_roles"("name");

-- CreateIndex
CREATE INDEX "user_company_roles_name_idx" ON "user_company_roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_name_key" ON "user_roles"("name");

-- CreateIndex
CREATE INDEX "user_roles_name_idx" ON "user_roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_vinNumber_key" ON "Driver"("vinNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Model_name_brand_id_year_key" ON "Model"("name", "brand_id", "year");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Photo_name_key" ON "Photo"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FleetRecord_order_id_key" ON "FleetRecord"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "Negotiation_driver_id_order_id_key" ON "Negotiation"("driver_id", "order_id");

-- CreateIndex
CREATE UNIQUE INDEX "Point_driver_id_key" ON "Point"("driver_id");

-- CreateIndex
CREATE INDEX "location_idx" ON "Point" USING GIST ("coords");

-- CreateIndex
CREATE INDEX "location1_idx" ON "MiniPoint" USING GIST ("coords");

-- CreateIndex
CREATE UNIQUE INDEX "Information_orderId_key" ON "Information"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Information_pointId_key" ON "Information"("pointId");

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SubService_name_service_id_key" ON "SubService"("name", "service_id");

-- CreateIndex
CREATE UNIQUE INDEX "AblyChannel_channelName_key" ON "AblyChannel"("channelName");

-- CreateIndex
CREATE UNIQUE INDEX "AblyChannel_ablyUser_key" ON "AblyChannel"("ablyUser");

-- CreateIndex
CREATE UNIQUE INDEX "AblyChannel_user_id_key" ON "AblyChannel"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Comunication_orderId_key" ON "Comunication"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Comunication_orderId_driverChanelId_key" ON "Comunication"("orderId", "driverChanelId");

-- CreateIndex
CREATE UNIQUE INDEX "Comunication_orderId_riderChanelId_key" ON "Comunication"("orderId", "riderChanelId");

-- CreateIndex
CREATE UNIQUE INDEX "_AblyChannelToOrder_AB_unique" ON "_AblyChannelToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_AblyChannelToOrder_B_index" ON "_AblyChannelToOrder"("B");

-- AddForeignKey
ALTER TABLE "user_channels" ADD CONSTRAINT "user_channels_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_channels" ADD CONSTRAINT "user_channels_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "criterion_set_memberships" ADD CONSTRAINT "criterion_set_memberships_set_Id_fkey" FOREIGN KEY ("set_Id") REFERENCES "criterion_sets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "criterion_set_memberships" ADD CONSTRAINT "criterion_set_memberships_criterion_Id_fkey" FOREIGN KEY ("criterion_Id") REFERENCES "criteria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_evaluated_Id_fkey" FOREIGN KEY ("evaluated_Id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_criterionSet_Id_fkey" FOREIGN KEY ("criterionSet_Id") REFERENCES "criterion_sets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_evaluator_Id_fkey" FOREIGN KEY ("evaluator_Id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scores" ADD CONSTRAINT "scores_evaluation_Id_fkey" FOREIGN KEY ("evaluation_Id") REFERENCES "evaluations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scores" ADD CONSTRAINT "scores_criterion_Id_fkey" FOREIGN KEY ("criterion_Id") REFERENCES "criteria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile_pictures" ADD CONSTRAINT "user_profile_pictures_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile_pictures" ADD CONSTRAINT "user_profile_pictures_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evidence_files" ADD CONSTRAINT "evidence_files_evidenceId_fkey" FOREIGN KEY ("evidenceId") REFERENCES "evidences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evidence_files" ADD CONSTRAINT "evidence_files_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evidences" ADD CONSTRAINT "evidences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evidences" ADD CONSTRAINT "evidences_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_insuranceDetailsId_fkey" FOREIGN KEY ("insuranceDetailsId") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_negotiationId_fkey" FOREIGN KEY ("negotiationId") REFERENCES "Negotiation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_points" ADD CONSTRAINT "user_points_pointId_fkey" FOREIGN KEY ("pointId") REFERENCES "Point"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_points" ADD CONSTRAINT "user_points_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_vehicleInfoId_fkey" FOREIGN KEY ("vehicleInfoId") REFERENCES "VehicleInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleInfo" ADD CONSTRAINT "VehicleInfo_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleOrder" ADD CONSTRAINT "VehicleOrder_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleOrder" ADD CONSTRAINT "VehicleOrder_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "Model"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleOrder" ADD CONSTRAINT "VehicleOrder_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FleetRecord" ADD CONSTRAINT "FleetRecord_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_sub_service_id_fkey" FOREIGN KEY ("sub_service_id") REFERENCES "SubService"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_departure_id_fkey" FOREIGN KEY ("departure_id") REFERENCES "Point"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "Point"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Negotiation" ADD CONSTRAINT "Negotiation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Negotiation" ADD CONSTRAINT "Negotiation_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Negotiation" ADD CONSTRAINT "Negotiation_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Information" ADD CONSTRAINT "Information_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Information" ADD CONSTRAINT "Information_pointId_fkey" FOREIGN KEY ("pointId") REFERENCES "Point"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubService" ADD CONSTRAINT "SubService_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AblyChannel" ADD CONSTRAINT "AblyChannel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comunication" ADD CONSTRAINT "Comunication_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comunication" ADD CONSTRAINT "Comunication_driverChanelId_fkey" FOREIGN KEY ("driverChanelId") REFERENCES "AblyChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comunication" ADD CONSTRAINT "Comunication_riderChanelId_fkey" FOREIGN KEY ("riderChanelId") REFERENCES "AblyChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AblyChannelToOrder" ADD CONSTRAINT "_AblyChannelToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "AblyChannel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AblyChannelToOrder" ADD CONSTRAINT "_AblyChannelToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
