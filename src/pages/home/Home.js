import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import SlotsDisplay from "../../components/slotsDisplay";
// import citiesList from "../../citiesList";
import CityOptions from "../../components/cityOptions/CityOptions";
import AreaOptions from "../../components/areaOptions/AreaOptions";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Home = () => {
  const navigate = useNavigate();
  const [citiesList, setCitiesList] = useState({
    listCities: [],
    status: apiConstants.initial,
    msg: "",
  });
  const [cityInput, setCityInput] = useState({});
  const [isCitySelected, setIsCitySelected] = useState(false);
  const [areaList, setAreasList] = useState({
    listArea: [],
    status: apiConstants.initial,
    msg: "",
  });
  const [areaInput, setAreaInput] = useState({});
  const [isAreaSelected, setIsAreaSelected] = useState(false);
  const [slotsList, setSlotsList] = useState({
    listSlots: [],
    status: apiConstants.initial,
    msg: "",
  });
  const [selectedSlot, setSelectedSlot] = useState({});
  const [displaySlotsSection, setDisplaySlotsSection] = useState(false);
  const [slotBookStatus, setSlotBookStatus] = useState({
    status: apiConstants.initial,
    msg: "",
  });
  const [isBookButtonShown, setIsBookButtonShown] = useState(false);

  useEffect(() => {
    const token = Cookies.get("srps-login-token");
    if (token === undefined) {
      navigate("/login-user-srps", { replace: true });
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    getCitiesAreas();
  }, []);

  const getCitiesAreas = async () => {
    try {
      setCitiesList((prevState) => ({
        ...prevState,
        msg: "",
        status: apiConstants.inProgress,
        listCities: [],
      }));
      const url = "http://localhost:3030/api/get-cities";
      const tokenSrps = Cookies.get("srps-login-token");
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenSrps}`,
        },
      };
      const fetchRes = await fetch(url, options);

      if (fetchRes.ok) {
        const resJson = await fetchRes.json();
        setCitiesList((prevState) => ({
          ...prevState,
          msg: "",
          status: apiConstants.success,
          listCities: resJson.citiesList,
        }));
      } else {
        const resJson = await fetchRes.json();
        setCitiesList((prevState) => ({
          ...prevState,
          msg: resJson.message,
          status: apiConstants.failure,
          listCities: [],
        }));
      }
    } catch (error) {
      console.log(error);
      setCitiesList((prevState) => ({
        ...prevState,
        msg: error.message,
        status: apiConstants.failure,
        listCities: [],
      }));
    }
  };

  const getAreasList = async (cityId) => {
    try {
      setAreasList((prevState) => ({
        ...prevState,
        msg: "",
        status: apiConstants.inProgress,
        listArea: [],
      }));
      const url = `http://localhost:3030/api/get-areas/${cityId}`;
      const tokenSrps = Cookies.get("srps-login-token");
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenSrps}`,
        },
      };
      const fetchRes = await fetch(url, options);

      if (fetchRes.ok) {
        const resJson = await fetchRes.json();
        setAreasList((prevState) => ({
          ...prevState,
          msg: "",
          status: apiConstants.success,
          listArea: resJson.areasList,
        }));
      } else {
        setAreasList((prevState) => ({
          ...prevState,
          msg: "",
          status: apiConstants.failure,
          listArea: [],
        }));
      }
    } catch (error) {
      console.log(error);
      setAreasList((prevState) => ({
        ...prevState,
        msg: error.msg,
        status: apiConstants.failure,
        listArea: [],
      }));
    }
    return;
  };

  const getSlotsList = async (cityId, areaId) => {
    try {
      setSlotsList((prevState) => ({
        ...prevState,
        msg: "",
        status: apiConstants.inProgress,
        listSlots: [],
      }));
      setSlotBookStatus((prevState) => ({
        ...prevState,
        status: apiConstants.initial,
        msg: "",
      }));
      const url = `http://localhost:3030/api/get-slots/${cityId}/${areaId}`;
      const tokenSrps = Cookies.get("srps-login-token");
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenSrps}`,
        },
      };
      const fetchRes = await fetch(url, options);

      if (fetchRes.ok) {
        const resJson = await fetchRes.json();
        setSlotsList((prevState) => ({
          ...prevState,
          msg: "",
          status: apiConstants.success,
          listSlots: resJson.slotsList,
        }));
      } else {
        const resJson = await fetchRes.json();
        setSlotsList((prevState) => ({
          ...prevState,
          msg: resJson.message,
          status: apiConstants.failure,
          listSlots: [],
        }));
      }
    } catch (error) {
      console.log(error);
      setSlotsList((prevState) => ({
        ...prevState,
        msg: error.message,
        status: apiConstants.failure,
        listSlots: [],
      }));
    }
    return;
  };

  const changeCityInput = (event) => {
    setSlotBookStatus((prevState) => ({
      ...prevState,
      status: apiConstants.initial,
      msg: "",
    }));
    const inputValue = event.target.value;
    if (inputValue !== "") {
      const cityObject = citiesList.listCities.find(
        (eachCity) => eachCity._id === inputValue
      );
      getAreasList(cityObject._id);
      setCityInput(cityObject);
      setIsCitySelected(true);
      setIsAreaSelected(false);
      setAreaInput({});
      setSlotsList([]);
      setSelectedSlot({});
      setDisplaySlotsSection(false);
    } else {
      setIsCitySelected(false);
      setCityInput({});
      setIsAreaSelected(false);
      setAreaInput({});
      setSlotsList([]);
      setSelectedSlot({});
      setDisplaySlotsSection(false);
    }
  };

  const changeAreaInput = (event) => {
    setSlotBookStatus((prevState) => ({
      ...prevState,
      status: apiConstants.initial,
      msg: "",
    }));
    const inputValue = event.target.value;
    if (inputValue !== "") {
      const areaObject = areaList.listArea.find(
        (eachArea) => eachArea._id === inputValue
      );
      getSlotsList(cityInput._id, areaObject._id);
      setAreaInput(areaObject);
      setIsAreaSelected(true);
      setSlotsList([]);
      setSelectedSlot({});
      setDisplaySlotsSection(false);
    } else {
      setIsAreaSelected(false);
      setAreaInput({});
      setSlotsList([]);
      setSelectedSlot({});
      setDisplaySlotsSection(false);
    }
  };

  const searchForSlots = () => {
    getSlotsList(cityInput._id, areaInput._id);
    setDisplaySlotsSection(true);
  };

  const changeSelectedSlot = (id) => {
    const slotSelected = slotsList.listSlots.find(
      (eachSlot) => eachSlot._id === id
    );
    setSelectedSlot(slotSelected);
    setIsBookButtonShown(true);
    setSlotBookStatus((prevState) => ({
      ...prevState,
      status: apiConstants.initial,
      msg: "",
    }));
  };

  const bookTheSlot = async () => {
    try {
      setIsBookButtonShown(false);
      setSlotBookStatus((prevState) => ({
        ...prevState,
        status: apiConstants.inProgress,
        msg: "",
      }));
      const url = `http://localhost:3030/api/book-slot`;
      const tokenSrps = Cookies.get("srps-login-token");
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenSrps}`,
        },
        body: JSON.stringify({
          cityId: selectedSlot.cityId,
          areaId: selectedSlot.areaId,
          slotId: selectedSlot._id,
          bookingStatus: true,
          timeSlot: selectedSlot.timeSlot,
        }),
      };
      const fetchRes = await fetch(url, options);

      if (fetchRes.ok) {
        const resJson = await fetchRes.json();
        setSlotBookStatus((prevState) => ({
          ...prevState,
          status: apiConstants.success,
          msg: resJson.message,
        }));
        setIsBookButtonShown(true);
        getSlotsList(cityInput._id, areaInput._id);
      } else {
        const resJson = await fetchRes.json();
        setSlotBookStatus((prevState) => ({
          ...prevState,
          status: apiConstants.failure,
          msg: resJson.message,
        }));
        setIsBookButtonShown(true);
      }
    } catch (error) {
      console.log(error.message);
      setSlotBookStatus({
        status: apiConstants.failure,
        msg: error.message,
      });
    }
  };

  return (
    <div className="home-main-container">
      <Header />
      <section className="home-select-element-section">
        <div className="container">
          <div className="row mt-5 mb-3">
            <div className="col-12 mb-3">
              <h3 className="home-available-slots-heading text-center text-center">
                Choose City and Area For Slots
              </h3>
            </div>
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-center">
                <select
                  className="home-city-select-ele"
                  value={isCitySelected ? cityInput._id : ""}
                  onChange={changeCityInput}
                >
                  <option
                    className="home-city-option"
                    value={""}
                    defaultChecked
                  >
                    Choose a City
                  </option>
                  {citiesList.listCities.map((eachCity) => (
                    <CityOptions key={eachCity._id} eachCity={eachCity} />
                  ))}
                </select>
                <select
                  className={
                    isCitySelected
                      ? "home-city-select-ele home-city-select-ele-2 home-city-select-ele-2-active"
                      : "home-city-select-ele home-city-select-ele-2"
                  }
                  disabled={isCitySelected ? false : true}
                  onChange={changeAreaInput}
                >
                  <option
                    className="home-city-option"
                    value={isAreaSelected ? areaInput._id : ""}
                    defaultChecked
                  >
                    Choose an Area
                  </option>
                  {isCitySelected
                    ? areaList.listArea.map((eachArea) => (
                        <AreaOptions key={eachArea._id} eachArea={eachArea} />
                      ))
                    : ""}
                </select>
              </div>
            </div>
            <div className="col-12 mt-3">
              <div className="d-flex align-items-center justify-content-center flex-wrap">
                <button
                  className={
                    isCitySelected && isAreaSelected
                      ? "btn btn-primary me-3"
                      : "btn btn-secondary me-3"
                  }
                  onClick={searchForSlots}
                  disabled={isCitySelected && isAreaSelected ? false : true}
                >
                  Search Slots
                </button>
                <a
                  className={
                    isCitySelected && isAreaSelected
                      ? "btn btn-warning me-3"
                      : "btn btn-secondary me-3"
                  }
                  disabled={isCitySelected && isAreaSelected ? false : true}
                  href={areaInput.locationLink}
                  role="button"
                  target="__blank"
                >
                  Locate us on map
                </a>
              </div>
            </div>
          </div>
          {displaySlotsSection && (
            <div className="row mt-5 mb-3">
              <div className="col-12 mt-3">
                <h3 className="home-available-slots-heading text-center">
                  Available Slots
                </h3>
              </div>
              <div className="col-12 mt-4">
                <ul className="slots-list-container">
                  {slotsList.listSlots.map((eachSlot) => (
                    <SlotsDisplay
                      key={eachSlot._id}
                      eachSlot={eachSlot}
                      changeSelectedSlot={changeSelectedSlot}
                      selectedSlot={selectedSlot}
                    />
                  ))}
                </ul>
              </div>
              <div className="col-12 mt-3 mb-3 text-center">
                {/* <button
                  className={
                    isSlotSelected ? "btn btn-success" : "btn btn-secondary"
                  }
                  disabled={isSlotSelected ? false : true}
                >
                  Book Slot
                </button> */}

                <button
                  type="button"
                  className={
                    isBookButtonShown ? "btn btn-success" : "btn btn-secondary"
                  }
                  disabled={isBookButtonShown ? false : true}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Book Slot
                </button>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <h3 className="book-modal-text">
                          Are Sure to book the Slot?
                        </h3>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={bookTheSlot}
                          data-bs-dismiss="modal"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-1 mb-3 text-center">
                <p className="slot-book-success-msg">{slotBookStatus.msg}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
