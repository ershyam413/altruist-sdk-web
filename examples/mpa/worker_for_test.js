importScripts("../../lib/firebird.js");

Firebird.init({
    app_key: "YOUR_APP_KEY",
    url: "https://your.domain.firebird",
    debug: true,
    test_mode: true
});

onmessage = function(e) {
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
    } else if (type === "get") {
        const queues = Firebird._internals.getLocalQueues();
        postMessage(queues);
    }
};