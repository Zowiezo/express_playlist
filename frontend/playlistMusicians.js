const showData = async () => {
    const list = document.getElementById("musicians");
    let response = await fetch(`http://localhost:3090/list`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(playlist =>
        playlist.forEach(artist => {
          let listElem = document.createElement("li");
          listElem.textContent = artist.nameOfArtist;
          list.appendChild(listElem);
        })
      );
  };
  showData();