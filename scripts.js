const songList = {
  1: "And I'm doing ninety, got to get there and hold him, If we can make it across the state line then baby, we're golden, Let the law pronounce its petty assertions, They've been outsmarted by a couple of urchins, And they hurt you bad, man, They hurt me too, But I'm not about to sit here and watch as they, Suck the blood from my wound, They suck the blood from my wound, Suck the blood from my wound, Suck the blood from my wound, Ohh man ".split(', '),

  2: "Twenty-five years and my life is still, Trying to get up that great big hill of hope, For a destination, I realized quickly when I knew I should, That the world was made up of this brotherhood of man, For whatever that means, And so I cry sometimes when I'm lying in bed, Just to get it all out what's in my head, And I, I am feeling a little peculiar, And so I wake in the morning and I step outside, And I take a deep breath and I get real high, and I Scream from the top of my lungs, What's going on?, And I say hey yeah yeah hey yeah yeah, I said hey what's going on?, And I say hey yeah yeah hey yeah yeah, I said hey what's going on?".split(', ')
};

// Initial redux state
const initialState = {
  currentSongId: null,
  songsById: {
    1: {
      title: 'Suck the Blood From my Wound',
      artist: 'Ezra Furman',
      songId: 1,
      songArray: songList[1],
      arrayPosition: 0
    },
    2: {
      title: 'What\'s Goin\' On',
      artist: 'Four Non-Blondes',
      songId: 2,
      songArray: songList[2],
      arrayPosition: 0
    }
  }
};

// REDUCER WILL GO HERE
const lyricChangeReducer = (state = initialState.songsById, action) => {
  let newArrayPosition;
  let newSongsByIdEntry;
  let newSongsByIdStateSlice;
  switch (action.type) {
    case 'NEXT_LYRIC':
      newArrayPosition = state[action.currentSongId].arrayPosition + 1;
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: newArrayPosition
      })
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });
      return newSongsByIdStateSlice;
    case 'RESTART_SONG':
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: 0
      })
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });
      return newSongsByIdStateSlice;
    default:
      return state;
  }
}

const songChangeReducer = (state = initialState.currentSongId, action) => {
  switch (action.type) {
    case 'CHANGE_SONG':
      return action.newSelectedSongId;
    default:
    return state;
  }
}


// REDUX STORE
const rootReducer = this.Redux.combineReducers({
  currentSongId: songChangeReducer,
  songsById: lyricChangeReducer
});

const { createStore } = Redux;
const store = createStore(rootReducer);


// RENDERING STATE IN DOM

const renderLyrics = () => {
  const lyricsDisplay = document.getElementById('lyrics');
  while (lyricsDisplay.firstChild) {
    lyricsDisplay.removeChild(lyricsDisplay.firstChild);
  }
  if (store.getState().currentSongId) {
    console.log(store.getState().currentSongId);
    const currentLine = document.createTextNode(store.getState().songsById[store.getState().currentSongId].songArray[store.getState().songsById[store.getState().currentSongId].arrayPosition]);
    document.getElementById('lyrics').appendChild(currentLine);
  } else {
    const selectSongMessage = document.createTextNode('Select a song from the menu above');
    document.getElementById('lyrics').appendChild(selectSongMessage);
  }
}

const renderSongs = () => {
  // console.log(store.getState().songsById.songsById);
  const songsById = store.getState().songsById;
  for (const songKey in songsById) {
    const song = songsById[songKey];
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const em = document.createElement('em');
    const songTitle = document.createTextNode(song.title);
    const songArtist = document.createTextNode(' by ' + song.artist);
    em.appendChild(songTitle);
    h3.appendChild(em);
    h3.appendChild(songArtist);
    h3.addEventListener('click', function() {
      selectSong(song.songId);
    });
    li.appendChild(h3);
    document.getElementById('songs').appendChild(li);
  }
}

window.onload = function() {
  console.log('asdf');
  renderSongs();
  renderLyrics();
}

// CLICK LISTENERS
const userClick = () => {
  console.log(store.getState());
  if (store.getState().songsById[store.getState().currentSongId].arrayPosition === store.getState().songsById[store.getState().currentSongId].songArray.length - 1) {
    store.dispatch({ type: 'RESTART_SONG',
                     currentSongId: store.getState().currentSongId });
  } else {
    store.dispatch({ type: 'NEXT_LYRIC',
                     currentSongId: store.getState().currentSongId });
  }
}

const selectSong = (newSongId) => {
  console.log("selects song: " + newSongId);
  let action = {
    type: 'CHANGE_SONG',
    newSelectedSongId: newSongId
  }
  store.dispatch(action);
}

// SUBSCRIBE TO REDUX STORE
store.subscribe(renderLyrics);


// REDUX STORE

// const { createStore } = Redux;
// const store = createStore(rootReducer);

// JEST TESTS + SETUP

const { expect } = window;

expect(lyricChangeReducer(initialState.songsById, { type: null })).toEqual(initialState.songsById);

expect(lyricChangeReducer(initialState.songsById, {type: 'NEXT_LYRIC', currentSongId: 2 })).toEqual({
  1: {
    title: 'Suck the Blood From my Wound',
    artist: 'Ezra Furman',
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0
  },
  2: {
    title: 'What\'s Goin\' On',
    artist: 'Four Non-Blondes',
    songId: 2,
    songArray: songList[2],
    arrayPosition: 1
  }
});

expect(lyricChangeReducer(initialState.songsById, { type: 'RESTART SONG', currentSongId: 1 })).toEqual({
  1: {
    title: 'Suck the Blood From my Wound',
    artist: 'Ezra Furman',
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0
  },
  2: {
    title: 'What\'s Goin\' On',
    artist: 'Four Non-Blondes',
    songId: 2,
    songArray: songList[2],
    arrayPosition: 0
  }
});

expect(songChangeReducer(initialState.currentSongId, { type: 'CHANGE_SONG', newSelectedSongId: 1 })).toEqual(1);

expect(rootReducer(initialState, { type: null })).toEqual(initialState);
expect(store.getState().currentSongId).toEqual(songChangeReducer(undefined, { type: null }));
expect(store.getState().songsById).toEqual(lyricChangeReducer(undefined, { type: null }));
