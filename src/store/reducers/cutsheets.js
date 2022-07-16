const initialState = {
    cutSheets: [
        {
            "name": "QGS &QGSV Series Rotary Screw Air Compressor",
            "category": "Air Compressor",
            "file": "AIRCOMPquincy2" },
        {
            "name": "Quincy Air Compressor",
            "category": "Air Compressor",
            "file": "AIRCOMPquincy"
        }, {
            "name": "Emax 10HP Compressor Model ESP10D120V3",
            "category": "Air Compressor",
            "file": "AIRCOMPemax"
        }, {
            "name": "Atlas Copco Compressor",
            "category": "Air Compressor",
            "file": "AIRCOMPatlas"
        }, {
            "name": "Ingersoll Rand Rotary Screw Compressors (5-15hp)",
            "category": "Air Compressor",
            "file": "AIRCOMPingersoll"
        }, {
            "name": "Ingersoll Rand Pressure Lubricated Air Compressor (5-30hp)",
            "category": "Air Compressor",
            "file": "AIRCOMPingersoll2"
        }, {
            "name": "Ingersoll Rand Two-Stage Reciprocating Air Compressor (5-7.5hp)",
            "category": "Air Compressor",
            "file": "AIRCOMPingersoll3"
        }, { "name": "XRS Airlift Doors", "category": "Bay Door", "file": "DOORairlift" }, {
            "name": "Baywatch Door Poly",
            "category": "Bay Door",
            "file": "DOORbaypoly"
        }, { "name": "Baywatch Door Vinyl", "category": "Bay Door", "file": "DOORbayvinyl" }, {
            "name": "Aqua-Lab Hydraflex Manifold",
            "category": "Detergent Dispensing",
            "file": "DDaqualab"
        }, { "name": "Flopro Wall Mount Panel", "category": "Detergent Dispensing", "file": "FLOPRO" }, {
            "name": "Cambridge Air Solutions",
            "category": "Heater",
            "file": "HEATcambridge"
        }, { "name": "Reznor Heater", "category": "Heater", "file": "HEATreznor" }, {
            "name": "Solaronics Heated Blowers",
            "category": "Heater",
            "file": "HEATsolaronics"
        }, { "name": "4 Port Hydraulic Power Unit Model HPU4", "category": "Hydraulic", "file": "HYDavw" }, {
            "name": "AVW Conveyor Power Unit Model CPU3",
            "category": "Hydraulic Pump",
            "file": "PUMPavw"
        }, { "name": "G&G Industrial Lighting", "category": "Lighting", "file": "LIGHTgg" }, {
            "name": "LED Light Strip",
            "category": "Lighting",
            "file": "LIGHTtss"
        }, { "name": "Rhino Mat Washer", "category": "Mat Washer", "file": "MATrhino" }, {
            "name": "UniMac Washer-Extractor",
            "category": "Mat Washer",
            "file": "MATunimac"
        }, { "name": "Mat Wacker", "category": "Mat Washer", "file": "MATwacker" }, {
            "name": "J-KO Mat Central Mat Cleaner",
            "category": "Mat Washer",
            "file": "MATjko"
        }, { "name": "Baldor Motor 10HP", "category": "Motor", "file": "MOTbaldor" }, {
            "name": "SEW Eurodrive",
            "category": "Motor",
            "file": "MOTeurodrive"
        }, { "name": "Leeson Motor", "category": "Motor", "file": "MOTleeson" }, {
            "name": "MicroLogic Pay System",
            "category": "Point of Sale",
            "file": "ML1"
        }, { "name": "ICS Auto passport RFID", "category": "Point of Sale", "file": "ICSrfid" }, {
            "name": "ICS Auto Sentry CPT",
            "category": "Point of Sale",
            "file": "ICSasCPT"
        }, { "name": "ICS Auto Sentry Flex", "category": "Point of Sale", "file": "ICSasflex" }, {
            "name": "ICS Auto Sentry Petro",
            "category": "Point of Sale",
            "file": "ICSaspetro"
        }, { "name": "Magnetic Pro Gate", "category": "Point of Sale", "file": "MAGgate" }, {
            "name": "ICS SmartStart Pro",
            "category": "Point of Sale",
            "file": "ICSsmartstart"
        }, { "name": "ICS Wash Connect", "category": "Point of Sale", "file": "ICSwashconnect" }, {
            "name": "ICS Tunnel Master wbc",
            "category": "Point of Sale",
            "file": "ICStunnelmasterwbc"
        }, { "name": "ICS ePOS", "category": "Point of Sale", "file": "ICSepos" }, {
            "name": "DRB Portal TI Plus",
            "category": "Point of Sale",
            "file": "DRBportal"
        }, { "name": "DRB C-Start", "category": "Point of Sale", "file": "DRBcstart" }, {
            "name": "DRB Sentinel",
            "category": "Point of Sale",
            "file": "DRBsentinel"
        }, { "name": "DRB c-Washpal", "category": "Point of Sale", "file": "DRBcwashpal" }, {
            "name": "DRB Wash Select II and Wash Select II POS",
            "category": "Point of Sale",
            "file": "DRBwashselect"
        }, { "name": "DRB EZ Trak", "category": "Point of Sale", "file": "DRBeztrak" }, {
            "name": "Banner Photo Eyes",
            "category": "Point of Sale",
            "file": "EYEbanner"
        }, { "name": "So Brite ERS-100 Reclaim System", "category": "Reclaim", "file": "RECLAIMsobrite" }, {
            "name": "Purwater Reclaim System Gen 2",
            "category": "Reclaim",
            "file": "RECLAIMpurwater"
        }, { "name": "Express Car Wash Reclaim System", "category": "Reclaim", "file": "RECLAIMec" }, {
            "name": "Expres Carwash RO System",
            "category": "Reverse Osmosis",
            "file": "ROec"
        }, {
            "name": "Huron Valley ProPak Spot Free Rinse System",
            "category": "Reverse Osmosis",
            "file": "ROhuron"
        }, { "name": "Tommy Dual Motor Vacuum System", "category": "Vacuum", "file": "VACtommy" }, {
            "name": "Eurovac System",
            "category": "Vacuum",
            "file": "VACeuro"
        }, { "name": "4.6HP Turbine Vacuum Motor", "category": "Vacuum", "file": "VACtommys2" }, {
            "name": "Auto Vacuums",
            "category": "Vacuum",
            "file": "VACauto"
        }, { "name": "ExpressVacuum", "category": "Vacuum", "file": "Express_Vacuum" }, {
            "name": "Huron Valley ProPak Boiler",
            "category": "Water Heater",
            "file": "WATERhuron"
        }, { "name": "PVI Conquest Water Heater", "category": "Water Heater", "file": "WATERpvi" }, {
            "name": "Cat Pump Model 5CP5120,5CP5120CSS",
            "category": "Water Pump",
            "file": "PUMPcat"
        }, { "name": "Cat Pump Plunger for Bay Gun", "category": "Water Pump", "file": "PUMPcat2" }, {
            "name": "Grundfos Pump Model 96432922",
            "category": "Water Pump",
            "file": "GF2"
        }, { "name": "Grundfos Pump Model 96541254", "category": "Water Pump", "file": "GF1" }, {
            "name": "AVW Triple Stack Pumping Station 3x20 GPM",
            "category": "Water Pump",
            "file": "TSavw"
        }, { "name": "15HP High Pressure Pump", "category": "Water Pump", "file": "PUMPics" }, {
            "name": "Hydra Cell High Pressure T100 Pump",
            "category": "Water Pump",
            "file": "PUMPhydracell"
        }, { "name": "Hydra Cell Pump Model D35 G35", "category": "Water Pump", "file": "PUMPhydracell5" }, {
            "name": "Hydra Cell Pump Model D10 G10",
            "category": "Water Pump",
            "file": "PUMPhydracell4"
        }, {
            "name": "Hydra Cell Wanner Regulator",
            "category": "Water Pump",
            "file": "PUMPhydracell1"
        }, {
            "name": "Hydra Cell Pressure Regulator Model C62 63 64",
            "category": "Water Pump",
            "file": "PUMPhydracell2"
        }, { "name": "Hydra Cell Air Bleed C80", "category": "Water Pump", "file": "PUMPhydracell3" }, {
            "name": "Tommy All in One High Pressure Pump Station",
            "category": "Water Pump",
            "file": "PUMPtommy"
        }, {
            "name": "Aqua Systems Water Softening System Gen II",
            "category": "Water Softener",
            "file": "SOFTaquasystem"
        }, {
            "name": "Huron Valley Water Softening System 480",
            "category": "Water Softener",
            "file": "SOFThuron"
        }, {
            "name": "Huron Valley Water Softening System 2900",
            "category": "Water Softener",
            "file": "SOFThuron1"
        }, { "name": "Huron Valley Water Softening System 9500", "category": "Water Softener", "file": "SOFThuron2" }, {
            "name": "Culligan Water Softener",
            "category": "Water Softener",
            "file": "SOFTculligan"
        }
    ]
};

const reducer = (state = initialState, action) => {
    return state;
};

export default reducer;
