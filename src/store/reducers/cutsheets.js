const initialState = {
    cutSheets: [
        {
            "name": "QGS & QGSV Series Rotary Screw Air Compressor",
            "category": "Air Compressor",
            "file": "AC2"
        },
        {
            "name": "Quincy Air Compressor ",
            "category": "Air Compressor",
            "file": "AC1"
        },
        {
            "name": "Emax 10HP Compressor Model ESP10D120V3",
            "category": "Air Compressor",
            "file": "AC10"
        },
        {
            "name": "Atlas Copco Compressor",
            "category": "Air Compressor",
            "file": "AC3"
        },
        {
            "name": "Ingersoll Rand 7.5HP Air Compressor ",
            "category": "Air Compressor",
            "file": "AC7"
        },
        {
            "name": "XRS Airlift Doors ",
            "category": "Bay Door",
            "file": "AD1"
        },
        {
            "name": "Baywatch Door Poly",
            "category": "Bay Door",
            "file": "BWP"
        },
        {
            "name": "Baywatch Door Vinyl",
            "category": "Bay Door",
            "file": "BWV"
        },
        {
            "name": "Aqua-Lab Hydraflex Manifold",
            "category": "Detergent Dispensing",
            "file": "HF1"
        },
        {
            "name": "Flopro Wall Mount Panel",
            "category": "Detergent Dispensing",
            "file": "FLOPRO"
        },
        {
            "name": "Cambridge Air Solutions",
            "category": "Heater",
            "file": "CB1"
        },
        {
            "name": "4 Port Hydraulic Power Unit Model HPU4",
            "category": "Hydraulic",
            "file": "HPU4"
        },
        {
            "name": "AVW Conveyor Power Unit Model CPU3 ",
            "category": "Hydraulic Pump",
            "file": "CPU3"
        },
        {
            "name": "G&G Industrial Lighting",
            "category": "Lighting",
            "file": "GG1"
        },
        {
            "name": "LED Light Strip",
            "category": "Lighting",
            "file": "LED2"
        },
        {
            "name": "Rhino Mat Washer ",
            "category": "Mat Washer",
            "file": "MW1"
        },
        {
            "name": "UniMac Washer-Extractor",
            "category": "Mat Washer",
            "file": "UM202"
        },
        {
            "name": "Mat Wacker",
            "category": "Mat Washer",
            "file": "MW8"
        },
        {
            "name": "J-KO Mat Central Mat Cleaner",
            "category": "Mat Washer",
            "file": "MW3"
        },
        {
            "name": "Sumitomo Drive Cyclo 6000 Model CNVMS1H-61DDYC-21",
            "category": "Motor",
            "file": "MOT1.5"
        },
        {
            "name": "Hyundai Electric AC Induction Motor",
            "category": "Motor",
            "file": "EM12"
        },
        {
            "name": "MicroLogic Pay System",
            "category": "Point of Sale ",
            "file": "ML1"
        },
        {
            "name": "ICS RFID Scanner ",
            "category": "Point of Sale ",
            "file": "RFID1"
        },
        {
            "name": "ICS Auto Sentry CPT",
            "category": "Point of Sale ",
            "file": "ASCPT"
        },
        {
            "name": "ICS Auto Sentry Flex ",
            "category": "Point of Sale ",
            "file": "ASFLEX"
        },
        {
            "name": "ICS Auto Sentry Petro",
            "category": "Point of Sale ",
            "file": "ASP"
        },
        {
            "name": "Magnetic Pro Gate ",
            "category": "Point of Sale ",
            "file": "MAG1"
        },
        {
            "name": "ICS SmartStart Pro",
            "category": "Point of Sale ",
            "file": "SPRO1"
        },
        {
            "name": "Wash Connect",
            "category": "Point of Sale ",
            "file": "WC1"
        },
        {
            "name": "So Brite ERS-100 Reclaim System",
            "category": "Reclaim",
            "file": "RC3"
        },
        {
            "name": "EC Reclaim System",
            "category": "Reclaim",
            "file": "RC2"
        },
        {
            "name": "So Brite ERS-100 Reclaim System",
            "category": "Reclaim ",
            "file": "SORC1"
        },
        {
            "name": "Express Car Wash Reclaim System",
            "category": "Reclaim ",
            "file": "RC1"
        },
        {
            "name": "EC RO System",
            "category": "Reverse Osmosis",
            "file": "ECRO1"
        },
        {
            "name": "Tommy Dual Motor Vacuum System",
            "category": "Vacuum",
            "file": "VAC2"
        },
        {
            "name": "Eurovac System",
            "category": "Vacuum",
            "file": "VAC30"
        },
        {
            "name": "4.6HP Turbine Vacuum Motor ",
            "category": "Vacuum",
            "file": "VAC46"
        },
        {
            "name": "Auto Vacuums ",
            "category": "Vacuum",
            "file": "AV1"
        },
        {
            "name": "PVI Conquest Water Heater",
            "category": "Water Heater ",
            "file": "WH1"
        },
        {
            "name": "Cat Pump Model 5CP5120,5CP5120CSS",
            "category": "Water Pump",
            "file": "CAT1"
        },
        {
            "name": "Grundfos Pump Model 96432922",
            "category": "Water Pump",
            "file": "GF2"
        },
        {
            "name": "Grundfos Pump Model 96541254",
            "category": "Water Pump",
            "file": "GF1"
        },
        {
            "name": "AVW Triple Stack Pumping Station 3x20 GPM ",
            "category": "Water Pump",
            "file": "TS1"
        },
        {
            "name": "15HP High Pressure Pump",
            "category": "Water Pump",
            "file": "HP15"
        },
        {
            "name": "Hydraulic Power Pack",
            "category": "Hydraulic",
            "file": "HPP"
        },
        {
            "name": "Aqua Systems Water Softening System Gen II",
            "category": "Water Softener",
            "file": "SFT1"
        },
        {
            "name": "Huron Valley Water Softening System 480",
            "category": "Water Softener",
            "file": "WS480"
        },
        {
            "name": "Huron Valley Water Softening System 2900",
            "category": "Water Softener",
            "file": "WS2900"
        },
        {
            "name": "Huron Valley Water Softening System 9500",
            "category": "Water Softener",
            "file": "WS9500"
        },
        {
            "name": "Hydra Cell High Pressure T100 Pump",
            "category": "Water Pump",
            "file": "HC1"
        },
        {
            "name": "Hydra Cell Pump Model D35 G35",
            "category": "Water Pump",
            "file": "HC35"
        },
        {
            "name": "Hydra Cell Pump Model D10 G10",
            "category": "Water Pump",
            "file": "HC10"
        },
        {
            "name": "Baldor Motor 10HP",
            "category": "Motor",
            "file": "MOT10"
        },
        {
            "name": "Hydra Cell Wanner Regulator ",
            "category": "Water Pump",
            "file": "HC2"
        },
        {
            "name": "Hydra Cell Pressure Regulator Model C62 63 64",
            "category": "Water Pump",
            "file": "HC3"
        },
        {
            "name": "Hydra Cell Air Bleed C80",
            "category": "Water Pump",
            "file": "HC4"
        },
        {
            "name": "Huron Valley ProPak Water Treatment System",
            "category": "Reclaim",
            "file": "RU1"
        },
        {
            "name": "Huron Valley ProPak Spot Free Rinse System",
            "category": "Reverse Osmosis",
            "file": "RO2"
        },
        {
            "name": "Huron Valley ProPak Boiler",
            "category": "Water Heater",
            "file": "WH4"
        }
    ]
};

const reducer = (state = initialState, action) => {
    return state;
};

export default reducer;
