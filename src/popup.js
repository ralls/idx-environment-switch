(function () {
    const node = document.getElementById('available')
    const settings = {
        switchTo: 'Switch to '
    }
    const domains = [
        {
            name: 'Live',
            host: 'idxbroker.com',
            theme: 'live'
        }, {
            name: 'Sandbox',
            host: 'idxsandbox.com',
            theme: 'sandbox'
        }, {
            name: 'Staging',
            host: 'idxstaging.com',
            theme: 'staging'
        }, {
            name: 'Scrum Local',
            host: 'scrum.lan',
            theme: 'local'
        }, {
            name: 'Dev Local',
            host: 'dev.lan',
            theme: 'local'
        }
    ]

    const query = { 'active': true, 'lastFocusedWindow': true }

    const methods = {
        textNode: text => document.createTextNode(text),
        el: el => document.createElement(el)
    }
    methods.make = function (params) {
        let el = this.el('button')
        el.setAttribute('data-loc', params.loc)
        el.setAttribute('class', `idx-button idx-button--${params.theme}`)
        el.innerHTML = params.text
        el.onclick = function () {
            chrome.tabs.update(null, {
                url: params.url
            })
            window.close()
        }
        return el
    }

    chrome.tabs.query(query, tabs => {
        const location = tabs[0].url

        let availableDomains = domains.filter(domain => {
            return !location.match(domain.host)
        })

        let matchedDomain = domains.filter(domain => {
            return location.match(domain.host)
        })

        if (availableDomains.length) {
            let h3 = methods.el('h3')
            h3.appendChild(methods.textNode('Switch to'))
            h3.setAttribute('class', 'idx-h3')
            node.appendChild(h3)
            availableDomains.forEach(domain => {
                const re = new RegExp(matchedDomain[0].host, 'gi')
                const url = location.replace(re, domain.host)
                const el = methods.make({ loc: domain.host, text: domain.name, url: url, theme: domain.theme })
                node.appendChild(el)
            })
        }
    })
})();
