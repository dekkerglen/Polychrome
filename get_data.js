const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function get_data() {
    const jokersUrl = 'https://balatro.wiki/en/Jokers';
    const jokersResponse = await axios.get(jokersUrl);
    const jokersTable = cheerio.load(jokersResponse.data);
    const jokersData = [];

    jokersTable('table tr').each((i, row) => {
        const rowData = [];
        jokersTable(row).find('td').each((j, cell) => {
          if (j === 1 && i > 0) {
              const imgSrc = jokersTable(cell).find('img').attr('src');
              rowData.push(`https://balatro.wiki/${imgSrc}`);
          } else {
              rowData.push(jokersTable(cell).text().trim());
          }
        });
        jokersData.push(rowData);
    });

    const jokersHeader = jokersData.shift();
    const jokers = jokersData.map(row => {
        return row.reduce((acc, cell, i) => {
            acc[jokersHeader[i]] = cell;
            return acc;
        }, {});
    });

    const planetsUrl = "https://balatro.wiki/en/Planet-Cards";
    const planetsResponse = await axios.get(planetsUrl);
    const planetsTable = cheerio.load(planetsResponse.data);
    const planetsData = [];

    planetsTable('table tr').each((i, row) => {
        const rowData = [];
        planetsTable(row).find('td').each((j, cell) => {
          if (j === 1 && i > 0) {
              const imgSrc = planetsTable(cell).find('img').attr('src');
              rowData.push(`https://balatro.wiki/${imgSrc}`);
          } else {
              rowData.push(planetsTable(cell).text().trim());
          }
        });
        planetsData.push(rowData);
    });

    const planetsHeader = planetsData.shift();
    const planets = planetsData.map(row => {
        return row.reduce((acc, cell, i) => {
            acc[planetsHeader[i]] = cell;
            return acc;
        }, {});
    });

    const tarotsUrl = "https://balatro.wiki/en/Tarot-Cards";
    const tarotsResponse = await axios.get(tarotsUrl);
    const tarotsTable = cheerio.load(tarotsResponse.data);
    const tarotsData = [];

    tarotsTable('table tr').each((i, row) => {
        const rowData = [];
        tarotsTable(row).find('td').each((j, cell) => {
          if (j === 1 && i > 0) {
              const imgSrc = tarotsTable(cell).find('img').attr('src');
              rowData.push(`https://balatro.wiki/${imgSrc}`);
          } else {
              rowData.push(tarotsTable(cell).text().trim());
          }
        });
        tarotsData.push(rowData);
    })

    const tarotsHeader = tarotsData.shift();
    const tarots = tarotsData.map(row => {
        return row.reduce((acc, cell, i) => {
            acc[tarotsHeader[i]] = cell;
            return acc;
        }, {});
    });

    const vouchersUrl = "https://balatro.wiki/en/Vouchers";
    const vouchersResponse = await axios.get(vouchersUrl);
    const vouchersTable = cheerio.load(vouchersResponse.data);
    const vouchersData = [];

    vouchersTable('table tr').each((i, row) => {
        const rowData = [];
        vouchersTable(row).find('td').each((j, cell) => {
          if (j === 1 && i > 0) {
              const imgSrc = vouchersTable(cell).find('img').attr('src');
              rowData.push(`https://balatro.wiki/${imgSrc}`);
          } else {
              rowData.push(vouchersTable(cell).text().trim());
          }
        });
        vouchersData.push(rowData);
    });

    const vouchersHeader = vouchersData.shift();
    const vouchers = vouchersData.map(row => {
        return row.reduce((acc, cell, i) => {
            acc[vouchersHeader[i]] = cell;
            return acc;
        }, {});
    });

    const spectralUrl = "https://balatro.wiki/en/Spectral-Cards";
    const spectralResponse = await axios.get(spectralUrl);
    const spectralTable = cheerio.load(spectralResponse.data);
    const spectralData = [];

    spectralTable('table tr').each((i, row) => {
        const rowData = [];
        spectralTable(row).find('td').each((j, cell) => {
          if (j === 1 && i > 0) {
              const imgSrc = spectralTable(cell).find('img').attr('src');
              rowData.push(`https://balatro.wiki/${imgSrc}`);
          } else {
              rowData.push(spectralTable(cell).text().trim());
          }
        });
        spectralData.push(rowData);
    });

    const spectralHeader = spectralData.shift();
    const spectral = spectralData.map(row => {
        return row.reduce((acc, cell, i) => {
            acc[spectralHeader[i]] = cell;
            return acc;
        }, {});
    })

    const decksUrl = "https://balatro.wiki/en/Decks";
    const decksResponse = await axios.get(decksUrl);
    const decksTable = cheerio.load(decksResponse.data);
    const decksData = [];

    decksTable('table tr').each((i, row) => {
        const rowData = [];
        decksTable(row).find('td').each((j, cell) => {
          if (j === 1 && i > 0) {
              const imgSrc = decksTable(cell).find('img').attr('src');
              rowData.push(`https://balatro.wiki/${imgSrc}`);
          } else {
              rowData.push(decksTable(cell).text().trim());
          }
        });
        decksData.push(rowData);
    })

    const decksHeader = decksData.shift();
    const decks = decksData.map(row => {
        return row.reduce((acc, cell, i) => {
            acc[decksHeader[i]] = cell;
            return acc;
        }, {});
    })

    const tagsUrl = "https://balatro.wiki/en/Blinds/Blind-Skips";
    const tagsResponse = await axios.get(tagsUrl);
    const tagsTable = cheerio.load(tagsResponse.data);
    const tagsData = [];

    tagsTable('table tr').each((i, row) => {
        const rowData = [];
        tagsTable(row).find('td').each((j, cell) => {
          if (j === 1 && i > 0) {
              const imgSrc = tagsTable(cell).find('img').attr('src');
              rowData.push(`https://balatro.wiki/${imgSrc}`);
          } else {
              rowData.push(tagsTable(cell).text().trim());
          }
        });
        tagsData.push(rowData);
    });

    const packsUrl = "https://balatro.wiki/en/Booster-Packs";
    const packsResponse = await axios.get(packsUrl);
    const packsTable = cheerio.load(packsResponse.data);
    const packsData = [];

    packsTable('table tr').each((i, row) => {
      const rowData = [];
      packsTable(row).find('td').each((j, cell) => {
        if (j === 1 && i > 0) {
            const imgSrc = packsTable(cell).find('img').attr('src');
            rowData.push(`https://balatro.wiki/${imgSrc}`);
        } else {
            rowData.push(packsTable(cell).text().trim());
        }
      })
      packsData.push(rowData); 
    });

    console.log(packsData);

    const packsHeader = packsData.shift();
    const packs = packsData.map(row => {
      return row.reduce((acc, cell, i) => {
        acc[packsHeader[i]] = cell;
        return acc;
      }, {});
    });

    const data = [
        ...jokers.map(joker => {
            return {
                Name: joker.Name,
                Appearance: joker.Appearance,
                Type: 'Joker',
                Rarity: joker.Rarity,
                Cost: joker.Cost,
                Effect: joker.Effect
            }
        }),
        ...planets.map(planet => {
            return {
                Name: planet.Name,
                Appearance: planet.Appearance,
                Type: 'Planet',
                Effect: planet["Hand Type"] + " " + planet.Effect.replace("\n           ", " ")
            }
        }),
        ...tarots.map(tarot => {
            return {
                Name: tarot.Name,
                Appearance: tarot.Appearance,
                Type: 'Tarot',
                Effect: tarot.Effect.replace("\n          ", ", ")
            }
        }),
        ...vouchers.map(voucher => {
            return {
                Name: voucher.Name,
                Appearance: voucher.Appearance,
                Type: 'Voucher',
                Effect: voucher.Effect
            }
        }),
        ...spectral.map(spectral => {
            return {
                Name: spectral.Name,
                Appearance: spectral.Appearance,
                Type: 'Spectral',
                Effect: spectral.Effect
            }
        }),
        ...decks.map(deck => {
            return {
                Name: deck.Name,
                Appearance: deck.Appearance,
                Type: 'Deck',
                Effect: deck.Effect,
                Unlock: deck["Unlock Condition"]
            }
        }),
        ...tagsData
          .filter(tag => tag[0] && tag[1] && tag[2] && tag[3])
          .map(tag => {
            return {
                Name: tag[2].replace(" Tag", ""),
                Appearance: tag[1],
                Type: 'Tag',
                Effect: tag[3]
            }
        }),
        ...packs.map(pack => {
          return {
            Name: pack.Name.replace(" Pack", ""),
            Appearance: pack.Visual,
            Type: 'Pack',
            Effect: pack.Effect
          }
        })
    ]

    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}

get_data();
