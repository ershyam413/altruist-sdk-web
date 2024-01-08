importScripts("../lib/firebird.js");

const STORE={}; // in-memory storage for worker

Firebird.init({
    app_key: "YOUR_APP_KEY",
    url: "https://your.domain.firebird",
    debug: true,
    storage: {
        getItem: function (key) {
            return STORE[key];
        },
        setItem: function (key, value) {
            STORE[key] = value;
        },
        removeItem: function (key) {
            delete STORE[key];
        }
    }
});

onmessage = function (e) {
    console.log(`Worker: Message received from main script:[${JSON.stringify(e.data)}]`);
    const data = e.data.data; const type = e.data.type;
    if (type === "event") {
        Firebird.add_event(data);
    } else if (type === "view") {
        Firebird.track_pageview(data);
    } else if (type === "session") {
        if (data === "begin_session") {
            Firebird.begin_session();
            return;
        }
        Firebird.end_session(null, true);   
    }
}