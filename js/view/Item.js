import DropZone from "./DropZone.js";
import KanbanAPI from "../api/KanbanAPI.js";

export default class Item {
    constructor(id, content) {
        const bottomDropZone = DropZone.createDropZone();

        this.elements = {};
        this.elements.root = Item.createRoot();
        this.elements.input = this.elements.root.querySelector(".kanban__item-input");
        this.elements.timestamp = this.elements.root.querySelector(".kanban__item-timestamp");
        this.elements.tagInput = this.elements.root.querySelector(".kanban__item-tag-input");
        this.elements.colorPicker = this.elements.root.querySelector(".kanban__item-color-picker");
        this.elements.prioritySelect = this.elements.root.querySelector(".kanban__item-priority-select");

        const getCurrentTimestamp = () => {
            const now = new Date();
            return now.toLocaleString(); 
        };

        this.elements.root.dataset.id = id;
        this.elements.input.textContent = content;
        const timestamp = getCurrentTimestamp();
        this.elements.timestamp.textContent = timestamp;
        this.content = content;

        this.elements.root.appendChild(bottomDropZone);

        const onBlur = () => {
            const newContent = this.elements.input.textContent.trim();

            if (newContent == this.content) {
                return;
            }

            this.content = newContent;

            KanbanAPI.updateItem(id, {
                content: this.content,
                tag: this.elements.tagInput.value, 
                color: this.elements.colorPicker.value, 
                priority: this.elements.prioritySelect.value,
                timestamp: timestamp 
            });
        };

        this.elements.input.addEventListener("blur", onBlur);

        this.elements.root.addEventListener("dblclick", () => {
            const check = confirm("Are you sure you want to delete this item?");

            if (check) {
                KanbanAPI.deleteItem(id);

                this.elements.input.removeEventListener("blur", onBlur);
                this.elements.root.parentElement.removeChild(this.elements.root);
            }
        });

        this.elements.root.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", id);
        });

        this.elements.input.addEventListener("drop", e => {
            e.preventDefault();
        });

        this.elements.colorPicker.addEventListener("input", () => {
            const selectedColor = this.elements.colorPicker.value;
            this.elements.input.style.backgroundColor = selectedColor;
            saveColorToLocalStorage(selectedColor); 
        });

        this.elements.colorPicker.addEventListener("change", () => {
            const selectedColor = this.elements.colorPicker.value;
            saveColorToLocalStorage(selectedColor); 
        });

        this.elements.prioritySelect.addEventListener("change", () => {
            const selectedPriority = this.elements.prioritySelect.value;
            savePriorityToLocalStorage(selectedPriority); 
        });

        this.elements.tagInput.addEventListener("input", () => {
            const taggedPerson = this.elements.tagInput.value;
            saveTaggedPersonToLocalStorage(taggedPerson); 
        });

        // Function to save selected color to local storage
        const saveColorToLocalStorage = (color) => {
            localStorage.setItem(`itemColor${id}`, color);
        };

        // Function to save tagged person name to local storage
        const saveTaggedPersonToLocalStorage = (personName) => {
            localStorage.setItem(`taggedPerson${id}`, personName);
        };

        // Function to save priority to local storage
        const savePriorityToLocalStorage = (priority) => {
            localStorage.setItem(`itemPriority${id}`, priority);
        };

        // Check if tagged person name, color, and priority are already saved in local storage
        const storedPersonName = localStorage.getItem(`taggedPerson${id}`);
        if (storedPersonName) {
            this.elements.tagInput.value = storedPersonName;
        }

        const storedColor = localStorage.getItem(`itemColor${id}`);
        if (storedColor) {
            this.elements.colorPicker.value = storedColor;
            this.elements.input.style.backgroundColor = storedColor;
        }

        const storedPriority = localStorage.getItem(`itemPriority${id}`);
        if (storedPriority) {
            this.elements.prioritySelect.value = storedPriority;
        }
    }

    static createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
            <div class="kanban__item" draggable="true">
                <div class="kanban__item-timestamp"></div>
                <div class="kanban__item-input" contenteditable></div>
                <input class="kanban__item-tag-input" type="text" placeholder="Tag person">
                <input class="kanban__item-color-picker" type="color">
                <select class="kanban__item-priority-select">
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
            </div>
        `).children[0];
    }
}

// Add the event listener for the logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
    // Add any logout logic here (e.g., clearing user data, session storage, etc.)
    
    // Redirect the user to the login screen
    window.location.href = "login.html"; // Adjust the URL as needed
});