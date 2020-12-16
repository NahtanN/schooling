import Publication from "../models/Publication";

import imageView from './images_view';
import tagsView from './tags_view';

export default {
    render(publication: Publication) {
        return {
            id: publication.id,
            title: publication.title,
            author: publication.author.author,
            image: imageView.renderHeadline(publication.image),
            tag: tagsView.renderHeadline(publication.publicationConnection)
        }
    },

    renderMany(publications: Publication[]) {
        return publications.map(publication => this.render(publication));
    }
}