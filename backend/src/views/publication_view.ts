import Publication from '../models/Publication';

import imagesView from './images_view';
import tagsView from './tags_view';

export default {
    render(publication: Publication) {
        return {
            id: publication.id,
            title: publication.title,
            content: publication.content,
            author: publication.author.author,
            images: imagesView.renderMany(publication.image),
            tags: tagsView.renderMany(publication.publicationConnection)
        }
    },

    renderMany(publications: Publication[]) {
        return publications.map(publication => this.render(publication))
    }
}