import React, { useState, useEffect } from "react";
import Downshift from "downshift";
import fetchJsonp from "fetch-jsonp";

import styles from "./CitySearch.module.css";

export default function({ countryCode, onChange }) {
  return (
    <Downshift
      onChange={onChange}
      itemToString={item => (item ? item : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        reset
      }) => (
        <div>
          <input type="hidden" value="prayer" />
          {/* <label {...getLabelProps()}>City</label> */}
          <input {...getInputProps()} name="city" placeholder="City" autoComplete="blah" />
          <ul {...getMenuProps()} className={styles.suggestions}>
            {isOpen ? (
              <CityList
                {...{
                  countryCode,
                  inputValue,
                  selectedItem,
                  highlightedIndex,
                  getItemProps,
                  reset
                }}
              />
            ) : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
}

const searches = {};

function CityList({
  countryCode,
  inputValue,
  selectedItem,
  highlightedIndex,
  getItemProps,
  reset
}) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (inputValue.length < 3) {
      if (items.length > 0) setItems([]);
      return;
    }
    if (searches[inputValue]) {
      setItems(searches[inputValue]);
      return;
    }
    fetchJsonp(
      `http://gd.geobytes.com/AutoCompleteCity?filter=${countryCode}&q=${inputValue}`
    )
      .then(r => r.json())
      .then(response => {
        searches[inputValue] = response;
        setItems(response);
      });
  }, [inputValue, countryCode, items.length]);

  return items.slice(0, 6).map((item, index) => (
    <li
      {...getItemProps({
        key: item,
        index,
        item,
        className: [
          highlightedIndex === index && "highlighted",
          selectedItem === item && "selected"
        ]
          .filter(Boolean)
          .join(" ")
      })}
    >
      {item}
    </li>
  ));
}
