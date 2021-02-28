const DATABASE_CHALLENGE = {
    challenges: [
        {
            id: 1,
            acronym: "R",
            color: "red",
            name: "Red Interference",
            desc: "Lenses are 50% weaker"
        },
        {
            id: 2,
            acronym: "B",
            color: "blue",
            name: "Blue Interference",
            desc: "Laser is 50% weaker"
        },
        {
            id: 3,
            acronym: "G",
            color: "green",
            name: "Green Interference",
            desc: "Raise total light gain to the power of 0.75"
        },
        {
            id: 4,
            acronym: "Y",
            color: "gold", //yellow is too bright
            name: "Yellow Interference",
            desc: "Multipliers to base light gain are disabled"
        }
    ],
    enterChallenge(g, id = 0) {
        DATABASE_PRISM.reset(g, true)
        g.interference.current = id
    },
    exitChallenge(g) {
        this.enterChallenge(g)
    },
    requirements: [
        {
            id: 1,
            requirement: new Decimal("1e165")
        },
        {
            id: 2,
            requirement: new Decimal("1e75")
        },
        {
            id: 3,
            requirement: new Decimal("1e75")
        },
        {
            id: 4,
            requirement: new Decimal("1e85")
        },
        {
            id: 5,
            requirement: new Decimal("1.07e107")
        },
        {
            id: 6,
            requirement: new Decimal("1e50")
        },
        {
            id: 7,
            requirement: new Decimal("1e60")
        },
        {
            id: 8,
            requirement: new Decimal("1e36")
        },
        {
            id: 9,
            requirement: new Decimal("1e36")
        },
        {
            id: 10,
            requirement: new Decimal("3.16e32")
        },
        {
            id: 11,
            requirement: new Decimal("4e41")
        },
        {
            id: 12,
            requirement: new Decimal("1e40")
        },
        {
            id: 13,
            requirement: new Decimal("4e35")
        },
        {
            id: 14,
            requirement: new Decimal("4e34")
        },
        {
            id: 15,
            requirement: new Decimal("1e34")
        }
    ],
    getRequirement(id) {
        for (let r of this.requirements) {
            if (id === r.id) return r.requirement
        }
        return new Decimal("1e9999")
        // return DATABASE_PRISM.baseRequirement
    },
    isInChallenge(g, id) {
        return (g.interference.current & Math.pow(2, id - 1)) !== 0
    },
    totalNodes(g) {
        let count = 0
        for (let i = 1; i <= 15; i++) {
            if ((g.interference.completed & Math.pow(2, i - 1)) !== 0) {
                count++;
            }
        }
        return count;
    },
    nodes(g) {
        let spent = this.upgrades.filter(u => this.isBought(g, u.id))
                                 .reduce((a, g) => a += g.cost, 0)
        return this.totalNodes(g) - spent;
    },
    isBought(g, id) {
        return (g.interference.upgrades & Math.pow(2, id - 1)) !== 0
    },
    applyUpg(g, id, def = 1) {
        return this.isBought(g, id) ? this.upgrades.filter(u => id === u.id)[0].current(g) : def
    },
    upgrades: [
        {
            id: 1,
            tier: 1,
            name: "Divergence",
            desc: "Increased base light gain based on unspent rainbow",
            current: (g) => (Math.pow(g.rainbow, 0.75)),
            prefix: "+",
            cost: 1
        },
        {
            id: 2,
            tier: 1,
            name: "Convergence",
            desc: "Lenses are stronger based on unspent rainbow",
            current: (g) => (Decimal.log10(g.rainbow) * 2)/50 + 1,
            cost: 1
        },
        {
            id: 3,
            tier: 1,
            name: "Parallel",
            desc: "Multiplier to base light gain based on unspent rainbow",
            current: (g) => Math.pow(Decimal.log10(g.rainbow), 2) + 1,
            cost: 1
        },
        {
            id: 4,
            tier: 2,
            parent: 1,
            name: "Recursion",
            desc: "Gain more rainbow based on unspent rainbow",
            current: (g) => Math.pow(2, Decimal.log10(g.rainbow + 1)),
            cost: 3
        },
        {
            id: 5,
            tier: 2,
            parent: 2,
            name: "Infinity",
            desc: "The stablization energy level is softcapped instead of hardcapped",
            cost: 3
        },
        {
            id: 6,
            tier: 2,
            parent: 3,
            name: "Phase shift",
            desc: "Boost the 4th dispersion upgrade (x => x^3)",
            cost: 3
        },
        {
            id: 7,
            tier: 3,
            parent: 4,
            name: "Fusion",
            desc: "Multiplier to light gain based on amount of light",
            current: (g) => Math.pow(1.3, Decimal.log10(g.light)) + 1,
            cost: 5
        },
        {
            id: 8,
            tier: 3,
            parent: 5,
            name: "RGB",
            desc: "You can equip all 3 lens at once, and lenses are 200% stronger if you are in interference",
            cost: 5
        },
        {
            id: 9,
            tier: 3,
            parent: 6,
            name: "Supernova",
            desc: "Static multiplier to light gain", //big static multiplier to light
            current: (g) => new Decimal(6.66e6),
            cost: 5
        },
        {
            id: 10,
            tier: 4,
            parent: 8,
            name: "Conclusion",
            desc: "Complete the game",
            cost: 6
        }
    ]
}