import {
  createContext,
  useContext,
  useEffect,
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

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <input
        className="border w-full"
        type="text"
        inputMode="numeric"
        value={gameString}
        onChange={(e) => {
          const value = e.target.value.trim();
          if (value.length === 81) {
            setGameString(value);
            setValues(getGameValues(value));
          }
        }}
      />

      <SudokuContext.Provider value={{ values, setValues }}>
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
    <div className="grid grid-cols-9 grid-rows-9 border">
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
  const { values, setValues } = useSudoku();

  if (value !== 0) {
    return (
      <div className="size-20 border grid">
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

  useEffect(() => {
    if (validValues.size === 1) {
      setValues((prev) => {
        const newValues = [...prev];
        newValues[coordToIndex(coord)] = [...validValues][0];
        return newValues;
      });
    }
  }, [setValues, values]);

  return (
    <div className="size-20 border grid">
      <div className="grid grid-cols-3 grid-rows-3 place-content-center text-gray-500">
        {[...validValues].map((v, index) => (
          <button
            className="grid place-content-center bg-white hover:bg-gray-200"
            onClick={() => {
              setValues((prev) => {
                const newValues = [...prev];
                newValues[coordToIndex(coord)] = v;
                return newValues;
              });
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
