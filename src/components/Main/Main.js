import React, { useState, useEffect } from "react";
import cx from "classnames";
import CardsSolid from "../../assets/images/cards-solid.png";
import List from "../../assets/images/list.png";
import CardGroup from "../CardGroup/CardGroup";
import "./main.scss";

const Main = ({ searchInput }) => {
  const [plants, setPlants] = useState();
  const [selectedPlants, setSelectedPlants] = useState();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewOptions, setViewOptions] = useState("card-view");
  const [viewToxicity, setViewToxicity] = useState("");

  const handleChange = (e) => {
    setViewToxicity(e.target.value);
    if (e.target.value === "non-toxic") {
      setSelectedPlants(plants.filter((plant) => !plant.toxicity));
    } else if (e.target.value === "toxic") {
      setSelectedPlants(plants.filter((plant) => plant.toxicity));
    } else setSelectedPlants(plants);
  };

  useEffect(() => {
    fetch(`./data/plants.json`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        let filteredPlants = myJson.plants.filter((plant) =>
          plant.names.common.toLowerCase().includes(searchInput.toLowerCase())
        );
        searchInput
          ? setSelectedPlants(filteredPlants)
          : setPlants(myJson.plants);
      });
  }, [searchInput]);

  useEffect(() => {
    searchInput === "" && setSelectedPlants(plants);
  }, [plants, searchInput]);

  return (
    <div className="main__container">
      <div className="flex filters">
        <div className="flex filters--left">
          <div className="toggle filters__toggle">
            <label htmlFor="fieldset1">Category</label>
            <fieldset id="fieldset1" className="flex">
              <input
                className="filters__toggle-input"
                type="radio"
                id="contactChoice1"
                name="contact"
                value="all"
                onClick={(e) => setSelectedCategory(e.target.value)}
                defaultChecked
              />
              <label
                className={cx(
                  "filters__toggle-label filters__toggle-label--left",
                  {
                    "filters__toggle-label--active": selectedCategory === "all",
                  }
                )}
                htmlFor="contactChoice1"
              >
                All plants
              </label>
              <input
                className="filters__toggle-input"
                type="radio"
                id="contactChoice2"
                name="contact"
                value="favorites"
                onClick={(e) => setSelectedCategory(e.target.value)}
              />
              <label
                className={cx(
                  "filters__toggle-label filters__toggle-label--right",
                  {
                    "filters__toggle-label--active":
                      selectedCategory === "favorites",
                  }
                )}
                htmlFor="contactChoice2"
              >
                Favorites
              </label>
            </fieldset>
          </div>
          <div className="dropdown filters__dropdown">
            <label htmlFor="toxicity" className="flex">
              Toxicity
            </label>
            <select
              className="dropdown"
              id="toxicity"
              name="toxicity"
              onChange={(e) => {
                handleChange(e);
              }}
            >
              <option value="Select">All</option>
              <option value="toxic">Toxic</option>
              <option value="non-toxic">Non-toxic</option>
            </select>
          </div>
        </div>
        <div className="filters--right">
          <div className="toggle views__toggle">
            <label htmlFor="fieldset-2">View options</label>
            <fieldset id="fieldset-2" className="flex">
              <input
                type="image"
                alt="Card view icon"
                src={CardsSolid}
                id="card-view"
                name="view"
                value="card-view"
                onClick={(e) => setViewOptions(e.target.value)}
                defaultChecked
              />
              <label
                className={cx(
                  "filters__toggle-label filters__toggle-label--left",
                  { "filters__toggle-label--active": viewOptions === "tile" }
                )}
                style={{ display: "none" }}
                htmlFor="card-view"
              >
                Card view
              </label>
              <input
                type="image"
                src={List}
                alt="List view icon"
                id="list-view"
                name="view"
                value="list"
                onClick={(e) => setViewOptions(e.target.value)}
              />
              <label
                className={cx(
                  "filters__toggle-label filters__toggle-label--right",
                  { "filters__toggle-label--active": viewOptions === "list" }
                )}
                style={{ display: "none" }}
                htmlFor="list-view"
              >
                List view
              </label>
            </fieldset>
          </div>
        </div>
      </div>
      {plants && (
        <CardGroup
          data={selectedPlants || plants}
          listView={viewOptions === "list"}
          toxicity={viewToxicity}
        />
      )}
    </div>
  );
};

export default Main;
