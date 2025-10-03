  "use strict";

    class Helper {
      constructor(time, list = []) {
        this.time = parseInt(400 / time);
        this.list = list;
      }
      mark = async (i) => { this.list[i].className = "cell current"; }
      markSpl = async (i) => { this.list[i].className = "cell min"; }
      unmark = async (i) => { this.list[i].className = "cell"; }
      pause = async () => new Promise(r => setTimeout(r, this.time));
      compare = async (i, j) => {
        await this.pause();
        return Number(this.list[i].getAttribute("value")) > Number(this.list[j].getAttribute("value"));
      }
      swap = async (i, j) => {
        await this.pause();
        let v1 = this.list[i].getAttribute("value");
        let v2 = this.list[j].getAttribute("value");
        this.list[i].setAttribute("value", v2);
        this.list[i].style.height = `${3 * v2}px`;
        this.list[j].setAttribute("value", v1);
        this.list[j].style.height = `${3 * v1}px`;
      }
    }

    class sortAlgorithms {
      constructor(time) {
        this.list = document.querySelectorAll(".cell");
        this.size = this.list.length;
        this.help = new Helper(time, this.list);
      }

      BubbleSort = async () => {
        for (let i = 0; i < this.size - 1; i++) {
          for (let j = 0; j < this.size - i - 1; j++) {
            await this.help.mark(j); await this.help.mark(j + 1);
            if (await this.help.compare(j, j + 1)) await this.help.swap(j, j + 1);
            await this.help.unmark(j); await this.help.unmark(j + 1);
          }
          this.list[this.size - i - 1].className = "cell done";
        }
        this.list[0].className = "cell done";
      }

      SelectionSort = async () => {
        for (let i = 0; i < this.size; i++) {
          let minIndex = i;
          for (let j = i; j < this.size; j++) {
            await this.help.markSpl(minIndex);
            await this.help.mark(j);
            if (await this.help.compare(minIndex, j)) minIndex = j;
            await this.help.unmark(j);
            await this.help.markSpl(minIndex);
          }
          await this.help.swap(i, minIndex);
          this.list[i].className = "cell done";
        }
      }

      InsertionSort = async () => {
        for (let i = 1; i < this.size; i++) {
          let j = i;
          while (j > 0 && await this.help.compare(j - 1, j)) {
            await this.help.swap(j - 1, j);
            j--;
          }
          this.list[i].className = "cell done";
        }
      }

      MergeSort = async () => {
        const mergeSortRec = async (start, end) => {
          if (start >= end) return;
          let mid = Math.floor((start + end) / 2);
          await mergeSortRec(start, mid);
          await mergeSortRec(mid + 1, end);
          let merged = [];
          let i = start, j = mid + 1;
          while (i <= mid && j <= end) {
            if (Number(this.list[i].getAttribute("value")) < Number(this.list[j].getAttribute("value"))) merged.push(Number(this.list[i++].getAttribute("value")));
            else merged.push(Number(this.list[j++].getAttribute("value")));
          }
          while (i <= mid) merged.push(Number(this.list[i++].getAttribute("value")));
          while (j <= end) merged.push(Number(this.list[j++].getAttribute("value")));
          for (let k = start; k <= end; k++) {
            this.list[k].setAttribute("value", merged[k - start]);
            this.list[k].style.height = `${3 * merged[k - start]}px`;
            this.list[k].className = "cell done";
            await this.help.pause();
          }
        }
        await mergeSortRec(0, this.size - 1);
      }

      QuickSort = async () => {
        const quickRec = async (l, r) => {
          if (l >= r) return;
          let pivot = Number(this.list[r].getAttribute("value"));
          let i = l;
          for (let j = l; j < r; j++) {
            if (Number(this.list[j].getAttribute("value")) < pivot) {
              await this.help.swap(i, j);
              i++;
            }
          }
          await this.help.swap(i, r);
          await quickRec(l, i - 1);
          await quickRec(i + 1, r);
        }
        await quickRec(0, this.size - 1);
        this.list.forEach(el => el.className = "cell done");
      }
    }

    const RenderScreen = async () => {
      let size = Number(document.querySelector(".size-menu").value);
      const arrayNode = document.querySelector(".array");
      arrayNode.innerHTML = "";
      let list = [];
      for (let i = 0; i < size; i++) list.push(Math.floor(Math.random() * 100) + 5);
      for (const val of list) {
        const node = document.createElement("div");
        node.className = "cell";
        node.setAttribute("value", val);
        node.style.height = `${3 * val}px`;
        arrayNode.appendChild(node);
      }
    }

    const showComplexity = (algo) => {
  const comp = document.getElementById("complexity");
  if (algo === 1) comp.innerText = "Bubble Sort → Best: O(n) | Worst: O(n²) | Space: O(1)";
  if (algo === 2) comp.innerText = "Selection Sort → Best: O(n²) | Worst: O(n²) | Space: O(1)";
  if (algo === 3) comp.innerText = "Insertion Sort → Best: O(n) | Worst: O(n²) | Space: O(1)";
  if (algo === 4) comp.innerText = "Merge Sort → Best: O(n log n) | Worst: O(n log n) | Space: O(n)";
  if (algo === 5) comp.innerText = "Quick Sort → Best: O(n log n) | Worst: O(n²) | Space: O(log n)";
  comp.classList.add("show"); // triggers animation
}


    const startSort = async () => {
      let algoValue = Number(document.querySelector(".algo-menu").value);
      if (algoValue === 0) { alert("Select Algorithm"); return; }
      showComplexity(algoValue);
      let speed = Number(document.querySelector(".speed-menu").value);
      if (speed === 0) speed = 1;
      let algo = new sortAlgorithms(speed);
      if (algoValue === 1) await algo.BubbleSort();
      if (algoValue === 2) await algo.SelectionSort();
      if (algoValue === 3) await algo.InsertionSort();
      if (algoValue === 4) await algo.MergeSort();
      if (algoValue === 5) await algo.QuickSort();
    }

    document.querySelector(".start").addEventListener("click", startSort);
    document.querySelector(".start").addEventListener("click", startSort);
    document.querySelector(".size-menu").addEventListener("change", RenderScreen);
    window.onload = RenderScreen;
    
