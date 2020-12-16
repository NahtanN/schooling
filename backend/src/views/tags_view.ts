import PublicationTag from "../models/PublicationTag";

export default {
    render(tag?: PublicationTag) {
        return tag?.tag.tag;
    },

    renderMany(tags: PublicationTag[]) {
        return tags.map(tag => this.render(tag));
    },

    renderHeadline(tags: PublicationTag[]) {        
        return this.render(tags.shift());
    }
}