import { CardTopic } from "@/types";
import { ReactNode } from "react";
import { FaDatabase } from "react-icons/fa";
import { GiLightningFrequency } from "react-icons/gi";
import { TbMathPiDivide2 } from "react-icons/tb";
import { LuMove3D } from "react-icons/lu";

interface Props {
    title: CardTopic;
}

export default function Card({title}: Props) {

    const renderIcon  = (topic: CardTopic): ReactNode => {
        switch (topic) {
            case "Experiment Aufbau": 
                return <GiLightningFrequency size={"12vh"} />
            case "Datenbank":
                return <FaDatabase size={"12vh"} />;
        
            case "Mathematische Ansätze":
                return <TbMathPiDivide2 size={"12vh"} />

                case "3D Darstellung":
                    return <LuMove3D size={"12vh"} />
        }
    }

        const renderHref = (topic: CardTopic): string => {
            switch (topic) {
            case "Experiment Aufbau": 
                return "Experiment/"
            case "Datenbank":
                return "Database/"
        
            case "Mathematische Ansätze":
                return "Math/"
            case "3D Darstellung":
                    return "3d/"
        }}

    return (
        <div className="rounded-xl box-border w-[33vh] h-[33vh] bg-gray border-3 border-white hover:scale-110 transition-transform duration-300">
            <a href={renderHref(title)} className="w-full h-full flex items-center justify-center flex-col gap-12">
                <big className="font-bold">{title}</big>
                {renderIcon(title)}
            </a>
        </div>
    )
}