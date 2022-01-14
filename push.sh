#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e


git add .
git commit -m '新增'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:tyj-321/tyj-321.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

# 把上面的 <USERNAME> 换成你自己的 Github 用户名，<REPO> 换成仓库名，比如我这里就是：
# git push -f git@github.com:tyj-321/blog.git master:1.0pages
git push

cd -