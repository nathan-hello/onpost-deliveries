import React from "react";

import {
  TStateAbbreviation,
  StateAbbreviations,
  StateNames,
  StatePaths,
  TStateAbbreviations,
} from "@/components/usa/data";
import "../styles.css";
import { cn } from "@/lib/utils";

type OnStateClick = (state: TStateAbbreviation) => void;
type OnStateHover = (state: TStateAbbreviation) => void;


interface MapSettings {
  width?: string | number;
  height?: string | number;
  title?: string;
  hideStates?: [TStateAbbreviation];
}

interface Props {
  defaultState?: {props: React.SVGProps<SVGPathElement>};
  customStates?: {
    [key in TStateAbbreviation]?: {props: React.SVGProps<SVGPathElement>};
  };
  mapSettings?: MapSettings;
  className?: string;
}

const USAMap: React.FC<Props> = ({
  defaultState,
  customStates = {},
  mapSettings = {
    width: "100%",
    height: "fit-content",
  },
  className = "",
}) => {
  const { width, height } = mapSettings;

  const onClick = (stateAbbreviation: TStateAbbreviation) => {
    if (customStates[stateAbbreviation]?.onClick) {
      customStates[stateAbbreviation]?.onClick!(stateAbbreviation);
    } else {
      defaultState.onClick?.(stateAbbreviation);
    }
  };

  const onHover = (stateAbbreviation: TStateAbbreviation) => {
    if (customStates[stateAbbreviation]?.onHover) {
      customStates[stateAbbreviation]?.onHover!(stateAbbreviation);
    } else {
      defaultState.onHover?.(stateAbbreviation);
    }
  };

  return (
    <svg
      className={`usa-map ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 959 593"
    >
      <g className="outlines">
        {Object.entries(StatePaths)
          .map(([abbreviation, path]) => {
            if (mapSettings.hideStates?.includes(abbreviation as TStateAbbreviation)) {
              return null;
            }

            return (

                <path
                key={abbreviation}
                d={path}
                data-name={abbreviation}
                className={cn(defaultState?.className, customStates[abbreviation as TStateAbbreviation]?.className)}
                fill={customStates[abbreviation as TStateAbbreviation]?.fill ?? defaultState?.fill ?? "#ffffff"}
                stroke={
                  customStates[abbreviation as TStateAbbreviation]?.stroke ?? defaultState?.stroke ?? "#000000"
                }
                {...customStates[abbreviation as TStateAbbreviation]}
                {...defaultState}

    />
            );
          })
          .filter((f) => f !== null)}

        {!mapSettings.hideStates?.includes("DC") && (
          <g className="DC state">
            <circle
              className="dc2"
              onClick={() => onClick("DC")}
              data-name={"DC"}
              fill={customStates["DC"]?.fill ?? defaultState.fill!}
              stroke={customStates["DC"]?.stroke ?? defaultState.stroke!}
              strokeWidth="1.5"
              cx="801.3"
              cy="251.8"
              r="5"
              opacity="1"
            />
          </g>
        )}
      </g>
    </svg>
  );
};

const USAState: React.FC<
  {
    callback: (ab: string) => void;
    dimensions: string;
    state: string;
  } & React.SVGProps<SVGPathElement>
> = ({ dimensions, state, ...props }) => {
  return (
  );
};

export { USAMap };
