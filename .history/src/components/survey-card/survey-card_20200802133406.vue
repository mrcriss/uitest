<template>
    <div class="cards-container">
        <div class="card-image" :style="styles">
            <h1>Hola</h1>
            <div class="card-status"></div>
            <div class="card-info">
                {{ id }}
                {{ name }}
                {{ argument }}
                {{ category }}
                {{ publishDate }}
                {{ image }}
            </div>
            <div class="card-options"></div>
            <div class="card-votes"></div>
        </div>
    </div>
</template>

<script src="./survey-card.script.js"></script>
<style lang="scss" scoped src="./survey-card.scss"></style>
