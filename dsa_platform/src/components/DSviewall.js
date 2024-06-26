import React from "react";
import { Link } from "react-router-dom";
import Header from './header';
import './DSviewall.css';

function DataStructuresViewAll() {
    const dataStructures = ["Arrays", "Matrix", "String", "Linked List", "Stack", "Queue", "Tree", "Heap", "Hashing", "Set", "Map", "Graph"];

    return (
        <div className="viewdsbox">
            <div>
                <Header />
            </div>
            <div>
                <div>
                    <div className="headingds">Data Structures</div>
                    <div className="desds">In this guide for Data Structures,you will learn about the concepts of DSA,
                        why and how to get started with DSA, learning, strategy, resources, and much more.
                    </div>
                </div>
                <div className="chapt">
                    <div className="chapterds">Chapters</div>
                    <div>
                        {dataStructures.map((ds) => (
                            <div className="ds">
                                <Link key={ds} to={`/data-structure/${ds}`}>{ds}</Link>
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

export default DataStructuresViewAll;