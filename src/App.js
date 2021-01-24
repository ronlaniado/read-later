/* global chrome */
import { useState, useEffect } from 'react';
import './App.css';
import ListItem from './components/ListItem';

function App() {
    const [readingList, setReadingList] = useState(null);
    useEffect(() => {
        if (chrome.storage)
            chrome.storage.sync.get(['readingList'], res =>
                setReadingList(res.readingList)
            );
    });
    return (
        <div className="App">
            <div>
                {readingList !== null ? (
                    Object.keys(readingList).map(item => {
                        console.log(readingList[item]);
                        return (
                            <ListItem
                                // title={readingList[item].title}
                                url={item}
                                date={readingList[item].date}
                                read={false}
                            />
                        );
                    })
                ) : (
                    <ListItem
                        url={'google.com'}
                        date={Date.now()}
                        read={false}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
