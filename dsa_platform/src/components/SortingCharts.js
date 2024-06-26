import { useContext, useEffect } from "react";
import { SortingContext } from "../contexts/SortingContext";
import './SortingCharts.css';

function SortingChart() {
    const { sortingState, generateSortingArray, startVisualizing, changeSortingSpeed, changeAlgorithm } = useContext(SortingContext);

    useEffect(() => {
        generateSortingArray();
    }, []);

    return (
        <div className="mt-4 mb-4 flex flex-col items-center sorting-container">
            <div className="sortingHeading">SORTING VISUALIZER!!</div>
            
            <div className="flex flex-wrap justify-center gap-3 mb-6 buttton-container">
                <button
                    style={{backgroundColor: "rgb(46 46 46", borderRadius: "30px", marginRight: "10px"}}
                    onClick={() => changeAlgorithm("bubble_sort")}
                    className={`bg-carbon text-white px-4 py-3 rounded-3xl ${
                        sortingState.algorithm === "bubble_sort" ? "bg-turquoise-dark" : "hover:bg-carbon-light"
                    } transition-all`}
                >
                    Bubble Sort
                </button>
                <button
                    style={{backgroundColor: "rgb(46 46 46", borderRadius: "30px", marginRight: "10px"}}
                    onClick={() => changeAlgorithm("insertion_sort")}
                    className={`bg-carbon text-white px-4 py-3 rounded-3xl ${
                        sortingState.algorithm === "insertion_sort" ? "bg-turquoise-dark" : "hover:bg-carbon-light"
                    } transition-all`}
                >
                    Insertion Sort
                </button>
                <button
                    style={{backgroundColor: "rgb(46 46 46", borderRadius: "30px", marginRight: "10px"}}
                    onClick={() => changeAlgorithm("selection_sort")}
                    className={`bg-carbon text-white px-4 py-3 rounded-3xl ${
                        sortingState.algorithm === "selection_sort" ? "bg-turquoise-dark" : "hover:bg-carbon-light"
                    } transition-all`}
                >
                    Selection Sort
                </button>
                <button
                    style={{backgroundColor: "rgb(46 46 46", borderRadius: "30px", marginRight: "10px"}}
                    onClick={() => changeAlgorithm("merge_sort")}
                    className={`bg-carbon text-white px-4 py-3 rounded-3xl ${
                        sortingState.algorithm === "merge_sort" ? "bg-turquoise-dark" : "hover:bg-carbon-light"
                    } transition-all`}
                >
                    Merge Sort
                </button>
                <button
                    style={{backgroundColor: "rgb(46 46 46", borderRadius: "30px", marginRight: "10px"}}
                    onClick={() => changeAlgorithm("quick_sort")}
                    className={`bg-carbon text-white px-4 py-3 rounded-3xl ${
                        sortingState.algorithm === "quick_sort" ? "bg-turquoise-dark" : "hover:bg-carbon-light"
                    } transition-all`}
                >
                    Quick Sort
                </button>
                <button
                    style={{backgroundColor: "rgb(46 46 46", borderRadius: "30px", marginRight: "10px"}}
                    onClick={() => changeAlgorithm("radix_sort")}
                    className={`bg-carbon text-white px-4 py-3 rounded-3xl ${
                        sortingState.algorithm === "radix_sort" ? "bg-turquoise-dark" : "hover:bg-carbon-light"
                    } transition-all`}
                >
                    Radix Sort
                </button>
            </div>

            <div className="max-w-3xl w-full">
                <div className="mb-4 chart-container">
                    <div className="base"></div>
                    {sortingState.array.map((bar, i) => (
                        <div key={i} className="bar-container">
                            <div className={`select-none bar bar-${bar.state}`} style={{ height: `${Math.floor((bar.value / 1000) * 100)}%` }}>
                                <p className={`pl-1.5 ${bar.state === "idle" ? "text-[#B1D2CF]" : "text-[#D8B7BE]"}`}>{bar.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-4 max-w-3xl mb-10 speed">
                    <button disabled={sortingState.sorting} onClick={startVisualizing} className="px-4 py-2 push-btn text-white-light disabled:brightness-75">
                        Start
                    </button>
                    <button disabled={sortingState.sorting} onClick={() => generateSortingArray()} className="text-white-light disabled:brightness-75 getArray">
                        New Array
                    </button>
                    <select
                        disabled={sortingState.sorting}
                        onChange={changeSortingSpeed}
                        style={{ color: "white", backgroundColor: "rgba(255, 255, 255, 0.055)", marginLeft: "550px"}}
                        defaultValue="slow"
                        className="ml-auto bg-carbon px-2 py-2 rounded-md cursor-pointer outline-none focus:ring ring-turquoise-dark disabled:brightness-75 disabled:cursor-default"
                    >
                        <option value="slow">Slow</option>
                        <option value="normal">Normal</option>
                        <option value="fast">Fast</option>
                    </select>
                </div>
                
            </div>
        </div>
    );
}

export default SortingChart;
