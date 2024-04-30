function algproccess(alg) {
  let split_alg = alg.split(" ");
  return {
    alg: split_alg,
    move: split_alg.length,
  };
}
function findoverwork(alg, move) {
  let overwork = 0;
  let allowed_overworks = [
    "R2",
    "R",
    "R'",
    "r",
    "r2",
    "r'",
    "L2",
    "L",
    "L'",
    "l",
    "l2",
    "l'",
  ];
  for (var i = 2; i < move; i++) {
    if (alg[i] === alg[i - 2] && !allowed_overworks.includes(alg[i])) {
      overwork += 1;
    }
  }
  return overwork;
}
function identify_half_turns(alg) {
  let dmove = 0;
  for (var i = 0; i < alg.length; i++) {
    if (
      alg[i] === "R2" ||
      alg[i] === "L2" ||
      alg[i] === "U2" ||
      alg[i] === "D2" ||
      alg[i] === "F2" ||
      alg[i] === "B2" ||
      alg[i] === "R2'" ||
      alg[i] === "L2'" ||
      alg[i] === "U2'" ||
      alg[i] === "D2'" ||
      alg[i] === "F2'" ||
      alg[i] === "B2'" ||
      alg[i] === "r2" ||
      alg[i] === "l2" ||
      alg[i] === "u2" ||
      alg[i] === "d2" ||
      alg[i] === "f2" ||
      alg[i] === "b2" ||
      alg[i] === "r2'" ||
      alg[i] === "l2'" ||
      alg[i] === "u2'" ||
      alg[i] === "d2'" ||
      alg[i] === "f2'" ||
      alg[i] === "b2'"
    ) {
      dmove++;
    }
  }
  return dmove;
}
function changegrip(current, move) {
  let newgrip = 1;
  if (move === "R'" || move === "L'" || move === "r'" || move === "l'") {
    if (current - 1 === 0) {
      newgrip = 4;
    } else {
      newgrip = current - 1;
    }
  } else if (identify_half_turns([move])) {
    if (current + 2 > 4) {
      newgrip = (current + 2) % 4;
    } else {
      newgrip = current + 2;
    }
  } else {
    if (current + 1 > 4) {
      newgrip = (current + 1) % 4;
    } else {
      newgrip = current + 1;
    }
  }
  return newgrip;
}
function regrip(alg, moveloc) {
  let to_find_of = alg.slice(moveloc, alg.lenght - 1);
  let a = findrgrips(to_find_of, 1, 1);
  let b = findrgrips(to_find_of, 1, 2);
  let c = findrgrips(to_find_of, 1, 3);
  let d = findrgrips(to_find_of, 1, 4);
  let e = findrgrips(to_find_of, 2, 1);
  let f = findrgrips(to_find_of, 2, 2);
  let g = findrgrips(to_find_of, 2, 3);
  let h = findrgrips(to_find_of, 2, 4);
  let i = findrgrips(to_find_of, 3, 1);
  let j = findrgrips(to_find_of, 3, 2);
  let k = findrgrips(to_find_of, 3, 3);
  let l = findrgrips(to_find_of, 3, 4);
  let m = findrgrips(to_find_of, 4, 1);
  let n = findrgrips(to_find_of, 4, 2);
  let o = findrgrips(to_find_of, 4, 3);
  let p = findrgrips(to_find_of, 4, 4);
  let arr = {
    "1,1": a,
    "1,2": b,
    "1,3": c,
    "1,4": d,
    "2,1": e,
    "2,2": f,
    "2,3": g,
    "2,4": h,
    "3,1": i,
    "3,2": j,
    "3,3": k,
    "3,4": l,
    "4,1": m,
    "4,2": n,
    "4,3": o,
    "4,4": p,
  };
  let key_of_lowest = "1,1";
  let lowest = 0;
  let z = 0;
  for (let key in arr) {
    z++;
    if (arr.hasOwnProperty(key)) {
      value = arr[key];
      if (z == 1) {
        lowest = value;
      } else {
        if (value < lowest) {
          lowest = value;
          key_of_lowest = key;
        }
      }
    }
  }
  return key_of_lowest;
}
function isrmove(move){
  let rmoves = [
    "U",
    "D''",
    "F",
    "B''",
    "u",
    "d'",
    "f",
    "b''"
  ]
  if (rmoves.includes(move)){
    return true
  }else{
    return false
  }
}
function findrgrips(alg, sgrip_r, sgrip_l) {
  let umoves = ["U", "U'", "U2", "u", "u'", "u2", "u2'", "U2'"];
  let regrips = 0;
  let wristmove_r = ["R2", "R", "R'", "r", "r2", "r'"];
  let wristmove_l = ["L2", "L", "L'", "l", "l2", "l'"];
  let current_r_grip = sgrip_r;
  let current_l_grip = sgrip_l;
  let lookup_r = {
    "U": [1, 2],
    "D'": [1],
    "F": [1, 4],
    "B'": [4],
    "u": [1, 2],
    "d'": [1],
    "f": [1, 4],
    "b'": [4],
  };
  let lookup_l = {
    "U'": [1, 2],
    "D": [1],
    "F'": [1, 4],
    "B": [4],
    "u'": [1, 2],
    "d": [1],
    "f'": [1, 4],
    "b": [4],
  };
  let i = 0;
  while (i < alg.length) {
    console.log("Grip of R " + current_r_grip, "At " + alg[i]);
    if (wristmove_r.includes(alg[i])) {
      current_r_grip = changegrip(current_r_grip, alg[i]);
    } else if (wristmove_l.includes(alg[i])) {
      current_l_grip = changegrip(current_l_grip, alg[i]);
    } else {
      if (isrmove(alg[i])) {
        let gr = lookup_r[alg[i]];
        if (!gr.includes(current_r_grip)) {
          if (umoves.includes(alg[i])) {
            if (!lookup_l["U'"].includes(current_l_grip)) {
              regrips++;
              console.log(
                "Back Push Regrip at " + alg[i] + "Current R grip " + current_r_grip
                );
                let toregrip = regrip(alg, i);
                let proccessingarr = toregrip.split(",");
                let right = Number(proccessingarr[0]);
                let left = Number(proccessingarr[1]);
                current_l_grip = left;
                current_r_grip = right;
              }
            } else {

            regrips++;
            console.log(
              "Regrip at " + alg[i] + "Current R grip " + current_r_grip
            );
            let toregrip = regrip(alg, i);
            let proccessingarr = toregrip.split(",");
            let right = Number(proccessingarr[0]);
            let left = Number(proccessingarr[1]);
            current_l_grip = left;
            current_r_grip = right;
          }
        }
      } else {
        if (
          !lookup_l[alg[i]].includes(current_l_grip) // &&
          //!lookup_l[alg[i].split("'")[0]].includes(current_r_grip)
        ) {
          if (umoves.includes(alg[i])) {

            if (!lookup_r["U"].includes(current_r_grip)) {
              regrips++;
              console.log(
                "Regrip at " + alg[i] + "Current R grip " + current_r_grip
              );
              let toregrip = regrip(alg, i);
              let proccessingarr = toregrip.split(",");
              let right = Number(proccessingarr[0]);
              let left = Number(proccessingarr[1]);
              current_l_grip = left;
              current_r_grip = right;
            }
          } else {
            regrips++;
            console.log(
              "Regrip at " + alg[i] + "Current R grip " + current_r_grip
            );
            let toregrip = regrip(alg, i);
            let proccessingarr = toregrip.split(",");
            let right = Number(proccessingarr[0]);
            let left = Number(proccessingarr[1]);
            current_l_grip = left;
            current_r_grip = right;
          }
        }
      }
    }
    i++;
  }
  return regrips;
}
function findoptimalgrip(to_find_of) {
  let a = findrgrips(to_find_of, 1, 1);
  let b = findrgrips(to_find_of, 1, 2);
  let c = findrgrips(to_find_of, 1, 3);
  let d = findrgrips(to_find_of, 1, 4);
  let e = findrgrips(to_find_of, 2, 1);
  let f = findrgrips(to_find_of, 2, 2);
  let g = findrgrips(to_find_of, 2, 3);
  let h = findrgrips(to_find_of, 2, 4);
  let i = findrgrips(to_find_of, 3, 1);
  let j = findrgrips(to_find_of, 3, 2);
  let k = findrgrips(to_find_of, 3, 3);
  let l = findrgrips(to_find_of, 3, 4);
  let m = findrgrips(to_find_of, 4, 1);
  let n = findrgrips(to_find_of, 4, 2);
  let o = findrgrips(to_find_of, 4, 3);
  let p = findrgrips(to_find_of, 4, 4);
  let arr = {
    "1,1": a,
    "1,2": b,
    "1,3": c,
    "1,4": d,
    "2,1": e,
    "2,2": f,
    "2,3": g,
    "2,4": h,
    "3,1": i,
    "3,2": j,
    "3,3": k,
    "3,4": l,
    "4,1": m,
    "4,2": n,
    "4,3": o,
    "4,4": p,
  };
  let key_of_lowest = "";
  let lowest = 0;
  let z = 0;
  for (let key in arr) {
    z++;
    if (arr.hasOwnProperty(key)) {
      value = arr[key];
      if (z == 1) {
        lowest = value;
        key_of_lowest = key;

      } else {
        if (value < lowest) {
          lowest = value;
          key_of_lowest = key;
        }
      }
    }
  }
  console.log("Starting From grip: " + key_of_lowest)
  return lowest;
}
function score(rawalg) {
  let splitalg= algproccess(rawalg).alg
  let movecount= algproccess(rawalg).move
  let overwork = findoverwork(splitalg,movecount)
  let rgrip = findoptimalgrip(splitalg)
  hturns = identify_half_turns(splitalg)
  return movecount + overwork * 1.5 + rgrip * 2 + hturns * 0.5;
}
