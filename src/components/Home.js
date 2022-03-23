import React, { useState, useEffect } from "react";
import InputComponent from "./InputComponent";
import { useDispatch, useSelector } from "react-redux";
import { CreateGraph } from "../store/graph-action";
import "./Home.css";

const Home = () => {
  const Dispatch = useDispatch();
  const graph = useSelector((state) => state.graph);
  const [username, setName] = useState("");

  const [relation1, setRelation1] = useState("");
  const [relation2, setRelation2] = useState("");
  const [relation3, setRelation3] = useState("");
  const [relation4, setRelation4] = useState("");
  const [AllNodes, setAllNodes] = useState([]);
  const [results, setResult] = useState([]);
  var result_arr = [];

  function printAllPaths(s, d) {
    let v = Object.keys(graph.adjacentList).length;
    let isVisited = new Array(v);
    for (let i = 0; i < v; i++) isVisited[i] = false;
    let pathList = [];

  
    pathList.push(s);

    const result = printAllPathsUtil(s, d, isVisited, pathList);
    setResult(result_arr);
    return result;
  }


  function printAllPathsUtil(u, d, isVisited, localPathList) {
    if (u === d) {
      result_arr.push(localPathList.join("->"));
      return result_arr;
    }
   
    isVisited[u] = true;

    for (let i = 0; i < graph.adjacentList[u].length; i++) {
      if (!isVisited[graph.adjacentList[u][i]]) {
       
        localPathList.push(graph.adjacentList[u][i]);
        printAllPathsUtil(
          graph.adjacentList[u][i],
          d,
          isVisited,
          localPathList
        );
      
        localPathList.splice(
          localPathList.indexOf(graph.adjacentList[u][i]),
          1
        );
      }
    }

    isVisited[u] = false;
  }

  var graphArray = [];
  Object.keys(graph.adjacentList).forEach((elem) =>
    graphArray.push([elem, graph.adjacentList[elem]])
  );

  useEffect(() => {
    setAllNodes(Object.keys(graph.adjacentList));
  
  }, []);
 
  const HandleFindPath = (source, end, graphList) => {
    printAllPaths(source, end, graphList);
  };
 
  const HandleCreateRelation = () => {
    graph.adjacentList[relation1].push(relation2);

    Dispatch(CreateGraph(graph.adjacentList));
  };

  const HandleSubmit = () => {
    if (username === "") {
      return;
    }
    if (Object.keys(graph.adjacentList).length === 0) {
      graph.adjacentList[username] = [];

      Dispatch(CreateGraph(graph.adjacentList));
    } else {
      let keys_arr = Object.keys(graph.adjacentList);
      if (keys_arr.includes(username)) {
        return;
      } else {
        graph.adjacentList[username] = [];
        Dispatch(CreateGraph(graph.adjacentList));
      }
    }
    setAllNodes(Object.keys(graph.adjacentList));

    Object.keys(graph.adjacentList).forEach((elem) =>
      graphArray.push([elem, graph.adjacentList[elem]])
    );
    setName("");
  };

  return (
    <div className="sidebar">
      <div className="members-list-container">
        <h1>Members</h1>
        {graphArray.map((elem) => (
          <div className="members-list">
            <div className="user-div">
              <h3>{elem[0]}:</h3>
            </div>
            <div className="members-array">
              {elem[1].map((elem) => (
                <p>&nbsp; {elem}&nbsp;</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="form-container">
        <div className="field-container">
          <div className="text-left">
            <h3>Step 1</h3>
          </div>
          <h1>Add a new Member</h1>
          <label>Name</label>
          <InputComponent
            label="Name"
            placeholder="Enter a name"
            onChange={(e) => setName(e.target.value)}
            value={username}
          />

          <button onClick={HandleSubmit} type="submit" className="submit-btn">
            <p>Add member</p>
          </button>
          <div className="margin-top">
            <div className="text-left">
              <h3>Step 2</h3>
            </div>
            <h1>Create a relation</h1>
            <InputComponent
              dropdown={true}
              label="First Member"
              placeholder="select a relation"
              default="friend"
              onChange={(e) => setRelation1(e.target.value)}
              nodes={AllNodes}
              value={relation1}
            />
            <InputComponent
              dropdown={true}
              label="First Member"
              placeholder="select a relation"
              default="friend"
              onChange={(e) => setRelation2(e.target.value)}
              nodes={AllNodes}
              value={relation2}
            />
            <button
              onClick={HandleCreateRelation}
              type="submit"
              className="submit-btn"
            >
              <p>Create Relation</p>
            </button>
          </div>
        </div>
        <div className="field-container">
          <div className="text-left">
            <h3>Step 3</h3>
          </div>
          <h1>Find the Separation</h1>
     
          <InputComponent
            dropdown={true}
            label="First Member"
            placeholder="select a relation"
            default="friend"
            onChange={(e) => setRelation3(e.target.value)}
            nodes={AllNodes}
            value={relation3}
          />
          <InputComponent
            dropdown={true}
            label="Second Member"
            placeholder="select a relation"
            default="friend"
            onChange={(e) => setRelation4(e.target.value)}
            nodes={AllNodes}
            value={relation4}
          />

          <button
            onClick={(e) =>
              HandleFindPath(relation3, relation4, graph.adjacentList)
            }
            type="submit"
            className="submit-btn"
          >
            <p>Find Path</p>
          </button>
          <div className="field-container">
            <h1>Relation</h1>
            <div className="field-container1">
              {results.map((elem) => (
                <h3>{elem}</h3>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
