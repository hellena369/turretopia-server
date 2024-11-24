class QuadTree {
    constructor(maxObjects = 25, maxLevels = 5, level = 0, bounds = { x: 0, y: 0, width: 100, height: 100 }) {
        this.maxObjects = maxObjects;
        this.maxLevels = maxLevels;
        this.level = level;
        this.bounds = bounds; // Minimum Bounding Rectangle (MBR)
        this.objects = []; // Objects in this node
        this.nodes = []; // Child nodes (branches)
    }

    // Calculate if two rectangles overlap
    isOverlapping(bounds1, bounds2) {
        return (
            bounds1.x < bounds2.x + bounds2.width &&
            bounds1.x + bounds1.width > bounds2.x &&
            bounds1.y < bounds2.y + bounds2.height &&
            bounds1.y + bounds1.height > bounds2.y
        );
    }

    // Split the node into 4 sub-nodes (quadrants)
    split() {
        const nextLevel = this.level + 1;
        const subWidth = this.bounds.width / 2;
        const subHeight = this.bounds.height / 2;
        const x = this.bounds.x;
        const y = this.bounds.y;

        // Create 4 child nodes
        this.nodes.push(new QuadTree(this.maxObjects, this.maxLevels, nextLevel, { x: x + subWidth, y: y, width: subWidth, height: subHeight }));
        this.nodes.push(new QuadTree(this.maxObjects, this.maxLevels, nextLevel, { x: x, y: y, width: subWidth, height: subHeight }));
        this.nodes.push(new QuadTree(this.maxObjects, this.maxLevels, nextLevel, { x: x, y: y + subHeight, width: subWidth, height: subHeight }));
        this.nodes.push(new QuadTree(this.maxObjects, this.maxLevels, nextLevel, { x: x + subWidth, y: y + subHeight, width: subWidth, height: subHeight }));
    }

    // Insert an object with its bounding box (MBR)
    insert(object) {
        if (this.nodes.length) {
            // Find the nodes the object fits into
            const nodes = this.getOverlappingNodes(object);
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].insert(object);
            }
            return;
        }

        // Add the object to this node
        this.objects.push(object);

        // Split if we exceed max objects and haven't reached the max depth
        if (this.objects.length > this.maxObjects && this.level < this.maxLevels) {
            if (!this.nodes.length) this.split();
            // Re-insert objects into child nodes
            for (let i = 0; i < this.objects.length; i++) {
                const obj = this.objects[i];
                const nodes = this.getOverlappingNodes(obj);
                for (let j = 0; j < nodes.length; j++) {
                    nodes[j].insert(obj);
                }
            }
            this.objects = []; // Clear the objects array after re-inserting
        }
    }

    // Get the nodes that overlap with an object's MBR
    getOverlappingNodes(object) {
        const overlappingNodes = [];
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.isOverlapping(object, this.nodes[i].bounds)) {
                overlappingNodes.push(this.nodes[i]);
            }
        }
        return overlappingNodes;
    }

    // Retrieve all objects that could collide with the given object
    retrieve(object) {
        let foundObjects = this.objects;

        // If there are child nodes, retrieve from them
        if (this.nodes.length) {
            const nodes = this.getOverlappingNodes(object);
            for (let i = 0; i < nodes.length; i++) {
                foundObjects = foundObjects.concat(nodes[i].retrieve(object));
            }
        }

        // Remove duplicates
        return [...new Set(foundObjects)];
    }

    // Clear the tree
    clear() {
        this.objects = [];
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].clear();
        }
        this.nodes = [];
    }
}

class CollisionGrid {
    constructor(width, height, gridSize = 100) {
        this.totalInstances = [];
        this.grid = [];
        this.outOfBoundObjects = [];
        this.width = width;
        this.height = height;
        this.gridSize = gridSize;
        this.quadTree = new QuadTree(); // Assuming your R-Tree-like QuadTree is defined as QuadTree
        this.initGrid();
    }

    initGrid() {
        // Initialize the grid if needed, else use QuadTree for initialization
        // This is now handled by the QuadTree structure itself
    }

    addToGrid(instance) {
        this.totalInstances.push(instance);
        this.quadTree.insert({
            x: instance.x,
            y: instance.y,
            width: instance.size, // Assuming size is the bounding box dimension
            height: instance.size,
            id: instance.id
        });
    }

    getCell(instance) {
        // Retrieve the relevant cell from the QuadTree instead of a grid
        return this.quadTree.retrieve({
            x: instance.x,
            y: instance.y,
            width: instance.size,
            height: instance.size
        });
    }

    reset(list) {
        this.totalInstances = [];
        this.grid = [];
        this.outOfBoundObjects = [];
        this.quadTree.clear();
        for (let i = 0; i < list.length; i++) {
            this.addToGrid(list[i]);
        }
    }

    hitDetection(instance, other) {
        // Simplified for R-Tree (already done in the QuadTree logic)
        return Math.sqrt(Math.pow(other.x - instance.x, 2) + Math.pow(other.y - instance.y, 2)) < (instance.size + other.size);
    }

    queryForCollisionPairs() {
        let pairs = [];
        const instances = this.totalInstances;

        for (let i = 0; i < instances.length; i++) {
            let instance = instances[i];
            let cell = this.getCell(instance);

            for (let j = 0; j < cell.length; j++) {
                let other = cell[j];
                let pair = instance.id > other.id ? [other.id, instance.id] : [instance.id, other.id];
                if (!pairs.includes(pair) && this.hitDetection(instance, other) && instance.id !== other.id) {
                    pairs.push(pair);
                }
            }
        }

        return pairs;
    }
}

module.exports = { QuadTree, CollisionGrid };