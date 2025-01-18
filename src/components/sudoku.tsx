import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type Coord = {
  x: number;
  y: number;
};

type Sudoku = {
  values: number[];
  setValues: Dispatch<SetStateAction<Sudoku["values"]>>;
  currentHoveringValue: number | null;
  setCurrentHoveringValue: Dispatch<
    SetStateAction<Sudoku["currentHoveringValue"]>
  >;
};

const SudokuContext = createContext<Sudoku | null>(null);

function useSudoku() {
  const context = useContext(SudokuContext);

  if (context === null) {
    throw new Error("Context not valid");
  }

  return context;
}

function getGameValues(gameString: string) {
  const values = gameString.split("").map((c) => Number(c));

  return values;
}

export function SudokuPage() {
  const [gameString, setGameString] = useState(
    "080200400570000100002300000820090005000715000700020041000006700003000018007009050"
  );
  const [values, setValues] = useState<Sudoku["values"]>(
    getGameValues(gameString)
  );
  const [currentHoveringValue, setCurrentHoveringValue] =
    useState<Sudoku["currentHoveringValue"]>(null);

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-row gap-2 w-full">
        <input
          className="border w-full px-2 font-mono"
          type="text"
          inputMode="numeric"
          value={gameString}
          onChange={(e) => {
            const value = e.target.value.trim();
            setGameString(value);
          }}
        />
        <button
          className="border grid place-content-center size-10 shrink-0 bg-white hover:bg-gray-200"
          onClick={() => {
            if (gameString.length === 81) {
              setValues(getGameValues(gameString));
            }
          }}
        >
          <span className="i-tabler-arrow-right text-xl" />
        </button>
      </div>

      <SudokuContext.Provider
        value={{
          values,
          setValues,
          currentHoveringValue,
          setCurrentHoveringValue,
        }}
      >
        <Game />
      </SudokuContext.Provider>
    </div>
  );
}

function indexToCoord(index: number): Coord {
  const x = index % 9;
  const y = Math.floor(index / 9);
  return { x, y };
}

function coordToIndex(coord: Coord): number {
  return coord.y * 9 + coord.x;
}

function Game() {
  const { values } = useSudoku();

  return (
    <div className="overflow-auto max-w-full place-items-start grid grid-cols-[repeat(9,_minmax(5rem,_1fr))] grid-rows-[repeat(9,_minmax(5rem,_1fr))] border-gray-500 border data-[cell-x=2]:*:border-r-gray-500 data-[cell-x=3]:*:border-l-0 data-[cell-x=5]:*:border-r-gray-500 data-[cell-x=6]:*:border-l-0 data-[cell-y=2]:*:border-b-gray-500 data-[cell-y=5]:*:border-b-gray-500 data-[cell-y=3]:*:border-t-0 data-[cell-y=6]:*:border-t-0">
      {values.map((value, index) => (
        <Cell key={index} value={value} coord={indexToCoord(index)} />
      ))}
    </div>
  );
}

function getV(v: number): number[] {
  if (v < 3) {
    return [0, 1, 2];
  } else if (v < 6) {
    return [3, 4, 5];
  } else {
    return [6, 7, 8];
  }
}

function getSubgrid(coord: Coord): Coord[] {
  const xs = getV(coord.x);
  const ys = getV(coord.y);

  return ys.map((y) => xs.map((x) => ({ x, y }))).flat();
}

function getHorizontal(coord: Coord): Coord[] {
  const y = coord.y;
  const xs = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return xs.map((x) => ({ x, y }));
}

function getVertical(coord: Coord): Coord[] {
  const x = coord.x;
  const ys = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return ys.map((y) => ({ x, y }));
}

function getValueByCoord(values: number[], coord: Coord): number {
  const index = coordToIndex(coord);

  return values[index];
}

type CellProps = {
  value: number;
  coord: Coord;
};
function Cell({ value, coord }: CellProps) {
  const { values, setValues, currentHoveringValue, setCurrentHoveringValue } =
    useSudoku();

  if (value !== 0) {
    return (
      <div
        className="size-full border grid data-[is-current-hovering=true]:bg-blue-200"
        data-cell-y={coord.y}
        data-cell-x={coord.x}
        data-is-current-hovering={currentHoveringValue === value}
      >
        <div className="text-xl font-bold grid place-content-center">
          {value}
        </div>
      </div>
    );
  }

  const invalidValues = new Set([
    ...getSubgrid(coord).map((c) => getValueByCoord(values, c)),
    ...getHorizontal(coord).map((c) => getValueByCoord(values, c)),
    ...getVertical(coord).map((c) => getValueByCoord(values, c)),
  ]);

  const validValues = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]).difference(
    invalidValues
  );

  return (
    <div
      className="size-full border grid"
      data-cell-y={coord.y}
      data-cell-x={coord.x}
    >
      <div className="grid grid-cols-3 grid-rows-3 place-content-center text-gray-500">
        {[...validValues].map((v, index) => (
          <button
            className="grid place-content-center bg-white hover:bg-gray-200 data-[is-current-hovering=true]:bg-blue-100"
            data-is-current-hovering={currentHoveringValue === v}
            onClick={() => {
              setValues((prev) => {
                const newValues = [...prev];
                newValues[coordToIndex(coord)] = v;
                return newValues;
              });
            }}
            onMouseEnter={() => {
              setCurrentHoveringValue(v);
            }}
            onMouseLeave={() => {
              setCurrentHoveringValue(null);
            }}
            key={index}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
