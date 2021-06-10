const { chromium } = require('playwright')
const prompt = require('prompt')

const { messengerUrl, schema } = require('./utils')

let username = (password = '')

;(async () => {
  // start prompt
  await prompt.start()

  // prompt username and password
  await prompt.get(schema, async (err, result) => {
    if (err) {
      console.log(`The script has encountered error(s): ${err}`)
    }

    username = result.username
    password = result.password

    if (!username || !password) {
      console.log(`No username and/or password provided`)
      return 1
    }

    // launch a chronium browser
    const browser = await chromium.launch({
      headless: false,
      slowMo: 1000,
    })

    // create a browser context
    // go to messenger website
    // and try to login with provided creds
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto(messengerUrl)
    await page.fill('#email', username)
    await page.fill('#pass', password)
    await page.click('#loginbutton')

    // redirected to form again, meaning username/password must be invalid
    if ((await page.url()) == `${messengerUrl}login/password/`) {
      console.log(
        'You have provided a wrong credential, closing the browser context'
      )
      await browser.close()
      return 1
    }

    // wait for first message item
    await page.waitForSelector(
      'div[data-testid="mwthreadlist-item"]:first-of-type'
    )

    // assign selected first message item to hasItem
    let hasItem = await page.$(
      'div[data-testid="mwthreadlist-item"]:first-of-type'
    )

    // while hasItem, do deletion of each message item
    while (hasItem) {
      // hover first message item
      await page.hover('div[data-testid="mwthreadlist-item"]:first-of-type')

      // wait for the ellipsis button to show
      await page.waitForSelector(
        'div[data-testid="mwthreadlist-item"]:first-of-type > div:nth-child(2) > div > div > div.m9osqain',
        { state: 'attached' }
      )

      // click ellipsis button for options
      await page.click(
        'div[data-testid="mwthreadlist-item"]:first-of-type > div:nth-child(2) > div > div > div.m9osqain'
      )

      // click "Delete Chat" item in the menu
      await page.click('text=Delete Chat')
      // click "Delete Chat" button
      await page.click(
        'div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.pfnyh3mw.taijpn5t.bp9cbjyn.owycx6da.btwxx1t3.kt9q3ron.ak7q8e6j.isp2s0ed.ri5dt5u2.rt8b4zig.n8ej3o3l.agehan2d.sk4xxmp2.tkv8g59h.fl8dtwsd.s1i5eluu.tv7at329'
      )

      // wait for 2secs, check if message item still exists and pass to hasItem
      // for the next iteration
      await page.waitForTimeout(2000)
      await page.waitForSelector(
        'div[data-testid="mwthreadlist-item"]:first-of-type'
      )
      hasItem = await page.$(
        'div[data-testid="mwthreadlist-item"]:first-of-type'
      )
    }

    // close the browse
    await browser.close()
  })
})()
