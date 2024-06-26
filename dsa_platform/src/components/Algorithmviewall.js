import React from "react";
import Header from './header';
import { Link } from "react-router-dom";
import './DSviewall.css';

function AlgorithmsViewAll() {
    const algorithms = [
        "Analysis of Algorithms", "Searching Algorithms", "Sorting Algorithms", 
        "Greedy Algorithms", "Dynamic Programming", "Recursion", 
        "Backtracking", "Mathematical Algorithms", "Bitwise Algorithms", 
        "Pattern Searching", "Divide & Conquer", "Graph Algorithms"
    ];

    return (
        <div className="viewdsbox">
            <div>
                <Header />
            </div>
            <div>
                <div>
                    <div className="headingds">Algorithms</div>
                    <div className="desds">In this guide for Algorithms, you will learn about the concepts of DSA,
                        why and how to get started with DSA, learning, strategy, resources, and much more.
                    </div>
                </div>
                <div className="chapt">
                    <div className="chapterds">
                        Chapters
                    </div>
                    <div>
                        {algorithms.map((algo) => (
                            <div className="ds">
                                <Link key={algo} to={`/algorithm/${algo}`}>{algo}</Link>
                            </div>
                        ))}
                    </div>
                    <div>
                        blank
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AlgorithmsViewAll;