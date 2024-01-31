const create = async (car) => {
    try {
      let response = await fetch("/api/car/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(car),
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  const list = async (signal) => {
    try {
      let response = await fetch("/api/car/", {
        method: "GET",
  
        signal: signal,
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  const read = async (params, credentials, signal) => {
    try {
      let response = await fetch("/api/car/" + params.carId, {
        method: "GET",
        signal: signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  const update = async (params, credentials, car) => {
    try {
      let response = await fetch("/api/car/" + params.carId, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
        body: JSON.stringify(car),
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  const remove = async (params) => {
    try {
      let response = await fetch("/api/car/" + params.carId, {
        method: "DELETE"
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  
  export { create, list, read, update, remove };
  