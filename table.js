class Table
{
    constructor(items)
    {
        this.loadItems(items);
    }

    loadItems(items)
    {
        this.isLoaded = items != null;
        this.items = items;
    }

    filterItems(str)
    {
        if (!this.isLoaded || str == null)
            return;

        let str_filter = str.toLowerCase();
        for (let i = 0; i < this.items.childNodes.length; i++)
        {
            let item = this.items.childNodes[i];
            if (item.hasChildNodes() && item.children[0] != null
                && item.children[0].children[1] != null
                && item.children[0].children[1].children[0] != null)
            {
                let item_name = item.children[0].children[1].children[0].innerHTML;
                if (item_name.toLowerCase().includes(str_filter))
                    item.style.display = "block";
                else
                    item.style.display = "none";
            }
        }
    }
}